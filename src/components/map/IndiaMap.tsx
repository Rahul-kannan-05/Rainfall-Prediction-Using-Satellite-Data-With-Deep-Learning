import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { indiaStates } from '@/lib/mockData';
import { Map as MapIcon, AlertCircle } from 'lucide-react';

interface IndiaMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
}

export const IndiaMap = ({ onLocationSelect }: IndiaMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [78.9629, 22.5937],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        // Add markers for states
        indiaStates.forEach((state) => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.cssText = `
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: hsl(${getRainfallHue(state.avgRainfall)}, 70%, 50%);
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            cursor: pointer;
          `;

          // Create popup content using DOM methods (safe from XSS)
          const popupContent = document.createElement('div');
          popupContent.style.padding = '8px';

          const title = document.createElement('h3');
          title.style.fontWeight = '600';
          title.style.marginBottom = '4px';
          title.textContent = state.name; // textContent auto-escapes

          const rainfall = document.createElement('p');
          rainfall.style.fontSize = '12px';
          rainfall.style.color = '#666';
          rainfall.textContent = `Avg Rainfall: ${state.avgRainfall} mm`;

          popupContent.appendChild(title);
          popupContent.appendChild(rainfall);

          const popup = new mapboxgl.Popup({ offset: 25 })
            .setDOMContent(popupContent);

          new mapboxgl.Marker(el)
            .setLngLat(state.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        });

        setIsMapInitialized(true);
      });

      // Click handler for location selection
      map.current.on('click', (e) => {
        const { lat, lng } = e.lngLat;
        setSelectedLocation({ lat, lng });
        onLocationSelect?.(lat, lng);

        // Remove existing selection marker
        const existingMarker = document.querySelector('.selection-marker');
        if (existingMarker) existingMarker.remove();

        // Add selection marker
        const el = document.createElement('div');
        el.className = 'selection-marker';
        el.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(210, 80%, 45%);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;

        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map.current!);
      });
    } catch (error) {
      console.error('Failed to initialize map:', error);
    }
  };

  const getRainfallHue = (rainfall: number) => {
    if (rainfall < 40) return 170; // Teal - low
    if (rainfall < 80) return 45;  // Yellow - moderate
    if (rainfall < 120) return 25; // Orange - heavy
    return 0; // Red - extreme
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized && !mapboxToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapIcon className="h-5 w-5" />
            India Rainfall Map
          </CardTitle>
          <CardDescription>
            Enter your Mapbox public token to view the interactive map
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Mapbox Token Required</p>
              <p className="text-muted-foreground">
                Get your free public token from{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  mapbox.com
                </a>{' '}
                → Account → Tokens
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1IjoieW91..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button onClick={initializeMap} disabled={!mapboxToken} className="w-full">
            Load Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapIcon className="h-5 w-5" />
          India Rainfall Map
        </CardTitle>
        <CardDescription>
          Click anywhere on the map to select a location for prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapContainer} 
          className="w-full h-[500px] rounded-lg overflow-hidden"
        />
        {selectedLocation && (
          <div className="mt-3 p-3 bg-muted rounded-lg text-sm">
            <span className="text-muted-foreground">Selected: </span>
            <span className="font-medium">
              {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E
            </span>
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(170, 70%, 50%)' }} />
            <span>Low (&lt;40mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(45, 70%, 50%)' }} />
            <span>Moderate (40-80mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(25, 70%, 50%)' }} />
            <span>Heavy (80-120mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(0, 70%, 50%)' }} />
            <span>Extreme (&gt;120mm)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SatelliteInput } from '@/types/rainfall';
import { Cloud, Loader2, MapPin, Thermometer, Sun, Droplets, LocateFixed } from 'lucide-react';
import { toast } from 'sonner';
interface PredictionFormProps {
  onSubmit: (input: SatelliteInput) => Promise<void>;
  isLoading: boolean;
}

export const PredictionForm = ({ onSubmit, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<SatelliteInput>({
    latitude: 20.5937,
    longitude: 78.9629,
    cloudTopTemperature: 240,
    infraredBrightness: 180,
    waterVaporIndex: 0.65,
    date: new Date().toISOString().split('T')[0],
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Check if coordinates are within India's bounds
        if (latitude >= 6 && latitude <= 38 && longitude >= 68 && longitude <= 98) {
          setFormData(prev => ({
            ...prev,
            latitude: parseFloat(latitude.toFixed(4)),
            longitude: parseFloat(longitude.toFixed(4)),
          }));
          toast.success('Location detected successfully!');
        } else {
          toast.warning('Your location is outside India. Using default coordinates.');
        }
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Location permission denied. Please enable location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information unavailable.');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out.');
            break;
          default:
            toast.error('Failed to get location.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };
  const updateField = <K extends keyof SatelliteInput>(field: K, value: SatelliteInput[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Satellite Parameters Input
        </CardTitle>
        <CardDescription>
          Enter satellite-derived parameters to generate rainfall prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Location Coordinates
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetLocation}
                disabled={isLocating}
              >
                {isLocating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <LocateFixed className="mr-2 h-4 w-4" />
                    Use My Location
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (°N)</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.0001"
                  min="6"
                  max="38"
                  value={formData.latitude}
                  onChange={(e) => updateField('latitude', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude (°E)</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.0001"
                  min="68"
                  max="98"
                  value={formData.longitude}
                  onChange={(e) => updateField('longitude', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Prediction Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </div>

          {/* Cloud Top Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-primary" />
                <Label>Cloud Top Temperature (K)</Label>
              </div>
              <span className="text-sm font-medium">{formData.cloudTopTemperature}K</span>
            </div>
            <Slider
              value={[formData.cloudTopTemperature]}
              onValueChange={([val]) => updateField('cloudTopTemperature', val)}
              min={180}
              max={300}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Lower values indicate taller clouds with higher precipitation potential
            </p>
          </div>

          {/* Infrared Brightness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                <Label>Infrared Brightness</Label>
              </div>
              <span className="text-sm font-medium">{formData.infraredBrightness}</span>
            </div>
            <Slider
              value={[formData.infraredBrightness]}
              onValueChange={([val]) => updateField('infraredBrightness', val)}
              min={100}
              max={280}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Higher values indicate warmer surfaces, lower cloud activity
            </p>
          </div>

          {/* Water Vapor Index */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <Label>Water Vapor Index</Label>
              </div>
              <span className="text-sm font-medium">{formData.waterVaporIndex.toFixed(2)}</span>
            </div>
            <Slider
              value={[formData.waterVaporIndex * 100]}
              onValueChange={([val]) => updateField('waterVaporIndex', val / 100)}
              min={0}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Higher values indicate more atmospheric moisture
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Prediction...
              </>
            ) : (
              <>
                <Cloud className="mr-2 h-4 w-4" />
                Generate Rainfall Prediction
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

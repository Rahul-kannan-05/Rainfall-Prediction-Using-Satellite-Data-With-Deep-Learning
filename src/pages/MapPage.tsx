import { AppLayout } from '@/components/layout/AppLayout';
import { IndiaMap } from '@/components/map/IndiaMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { indiaStates } from '@/lib/mockData';
import { MapPin } from 'lucide-react';

const MapPage = () => {
  const handleLocationSelect = (lat: number, lng: number) => {
    console.log('Selected location:', lat, lng);
  };

  // Sort states by rainfall for the table
  const sortedStates = [...indiaStates].sort((a, b) => b.avgRainfall - a.avgRainfall);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">India Rainfall Map</h1>
          <p className="text-muted-foreground">
            Interactive visualization of rainfall patterns across Indian states
          </p>
        </div>

        <IndiaMap onLocationSelect={handleLocationSelect} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              State-wise Average Rainfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {sortedStates.map((state) => (
                <div 
                  key={state.name}
                  className="p-2 bg-muted/50 rounded text-center text-sm"
                >
                  <p className="font-medium truncate" title={state.name}>
                    {state.name}
                  </p>
                  <p className="text-muted-foreground">{state.avgRainfall} mm</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MapPage;

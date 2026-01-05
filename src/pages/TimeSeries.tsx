import { AppLayout } from '@/components/layout/AppLayout';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTimeSeriesData } from '@/lib/mockData';
import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TimeSeriesPage = () => {
  const data = useMemo(() => generateTimeSeriesData(), []);
  
  const stats = useMemo(() => {
    const totals = data.reduce(
      (acc, d) => ({
        actual: acc.actual + d.actual,
        predicted: acc.predicted + d.predicted,
        error: acc.error + d.error,
      }),
      { actual: 0, predicted: 0, error: 0 }
    );

    return {
      avgActual: (totals.actual / data.length).toFixed(1),
      avgPredicted: (totals.predicted / data.length).toFixed(1),
      avgError: (totals.error / data.length).toFixed(2),
      totalActual: totals.actual.toFixed(0),
      maxActual: Math.max(...data.map(d => d.actual)).toFixed(1),
      minActual: Math.min(...data.map(d => d.actual)).toFixed(1),
    };
  }, [data]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Time Series Analysis</h1>
          <p className="text-muted-foreground">
            Historical rainfall trends and model prediction comparison
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.avgActual} mm</p>
              <p className="text-sm text-muted-foreground">Avg Daily Actual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.avgPredicted} mm</p>
              <p className="text-sm text-muted-foreground">Avg Daily Predicted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.avgError} mm</p>
              <p className="text-sm text-muted-foreground">Avg Absolute Error</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.totalActual} mm</p>
              <p className="text-sm text-muted-foreground">Total Annual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-accent" />
                <p className="text-2xl font-bold">{stats.maxActual} mm</p>
              </div>
              <p className="text-sm text-muted-foreground">Max Daily</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-2xl font-bold">{stats.minActual} mm</p>
              </div>
              <p className="text-sm text-muted-foreground">Min Daily</p>
            </CardContent>
          </Card>
        </div>

        <TimeSeriesChart />

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { season: 'Pre-Monsoon', months: 'March - May', icon: TrendingUp, pattern: 'Gradually increasing' },
                { season: 'Monsoon', months: 'June - September', icon: TrendingUp, pattern: 'Peak rainfall period' },
                { season: 'Post-Monsoon', months: 'October - November', icon: TrendingDown, pattern: 'Rapidly decreasing' },
                { season: 'Winter', months: 'December - February', icon: Minus, pattern: 'Minimal rainfall' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.season} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{item.season}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.months}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.pattern}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TimeSeriesPage;

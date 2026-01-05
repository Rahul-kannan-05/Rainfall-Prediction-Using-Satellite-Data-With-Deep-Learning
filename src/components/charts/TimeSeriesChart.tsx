import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { generateTimeSeriesData } from '@/lib/mockData';
import { LineChart as LineChartIcon } from 'lucide-react';

type ViewMode = 'comparison' | 'error' | 'seasonal';
type TimeRange = 'month' | 'quarter' | 'year';

export const TimeSeriesChart = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
  const [timeRange, setTimeRange] = useState<TimeRange>('year');

  const allData = useMemo(() => generateTimeSeriesData(), []);

  const filteredData = useMemo(() => {
    const now = new Date('2024-12-31');
    let startDate: Date;

    switch (timeRange) {
      case 'month':
        startDate = new Date('2024-12-01');
        break;
      case 'quarter':
        startDate = new Date('2024-10-01');
        break;
      default:
        startDate = new Date('2024-01-01');
    }

    return allData.filter(d => new Date(d.date) >= startDate);
  }, [allData, timeRange]);

  const seasonalData = useMemo(() => {
    const seasons = {
      'Pre-Monsoon (Mar-May)': allData.filter(d => {
        const month = new Date(d.date).getMonth();
        return month >= 2 && month <= 4;
      }),
      'Monsoon (Jun-Sep)': allData.filter(d => {
        const month = new Date(d.date).getMonth();
        return month >= 5 && month <= 8;
      }),
      'Post-Monsoon (Oct-Nov)': allData.filter(d => {
        const month = new Date(d.date).getMonth();
        return month >= 9 && month <= 10;
      }),
      'Winter (Dec-Feb)': allData.filter(d => {
        const month = new Date(d.date).getMonth();
        return month === 11 || month <= 1;
      }),
    };

    return Object.entries(seasons).map(([season, data]) => ({
      season,
      avgActual: data.reduce((sum, d) => sum + d.actual, 0) / data.length,
      avgPredicted: data.reduce((sum, d) => sum + d.predicted, 0) / data.length,
      avgError: data.reduce((sum, d) => sum + d.error, 0) / data.length,
    }));
  }, [allData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <LineChartIcon className="h-5 w-5" />
              Time Series Analysis
            </CardTitle>
            <CardDescription>
              Historical rainfall trends and model predictions
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comparison">Comparison</SelectItem>
                <SelectItem value="error">Error Analysis</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
              </SelectContent>
            </Select>
            {viewMode !== 'seasonal' && (
              <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">1 Month</SelectItem>
                  <SelectItem value="quarter">3 Months</SelectItem>
                  <SelectItem value="year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {viewMode === 'comparison' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 11 }} label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} mm`]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Predicted" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {viewMode === 'error' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 11 }} label={{ value: 'Error (mm)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} mm`]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="error" 
                  name="Absolute Error" 
                  fill="hsl(var(--chart-4) / 0.3)" 
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {viewMode === 'seasonal' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="season" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} label={{ value: 'Avg Rainfall (mm)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} mm`]}
                />
                <Legend />
                <Line type="monotone" dataKey="avgActual" name="Avg Actual" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                <Line type="monotone" dataKey="avgPredicted" name="Avg Predicted" stroke="hsl(var(--chart-2))" strokeWidth={3} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

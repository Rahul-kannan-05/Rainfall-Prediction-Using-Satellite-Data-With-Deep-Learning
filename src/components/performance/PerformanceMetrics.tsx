import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { performanceMetrics, trainingHistory, modelComparison } from '@/lib/mockData';
import { BarChart3, TrendingDown, Award } from 'lucide-react';

export const PerformanceMetrics = () => {
  const COLORS = ['hsl(210, 80%, 45%)', 'hsl(170, 60%, 40%)', 'hsl(45, 90%, 50%)', 'hsl(0, 70%, 55%)', 'hsl(280, 60%, 50%)'];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="pt-4">
              <p className="text-2xl font-bold text-primary">
                {metric.value}{metric.unit}
              </p>
              <p className="text-sm font-medium">{metric.name}</p>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Training & Validation Loss
          </CardTitle>
          <CardDescription>
            Loss convergence over 100 training epochs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="epoch" 
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Epoch', position: 'bottom', style: { fontSize: 11 } }}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Loss (MSE)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number) => [value.toFixed(4)]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="trainLoss" 
                  name="Training Loss" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="valLoss" 
                  name="Validation Loss" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Model Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Model Comparison
          </CardTitle>
          <CardDescription>
            Performance comparison with baseline models (RMSE in mm)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis 
                  type="category" 
                  dataKey="model" 
                  tick={{ fontSize: 10 }}
                  width={130}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number, name: string) => [`${value.toFixed(2)} ${name === 'rmse' ? 'mm' : ''}`, name.toUpperCase()]}
                />
                <Bar dataKey="rmse" name="RMSE" radius={[0, 4, 4, 0]}>
                  {modelComparison.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--muted-foreground) / 0.5)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* R² Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            R² Score Comparison
          </CardTitle>
          <CardDescription>
            Coefficient of determination (higher is better)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparison}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="model" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} domain={[0.6, 1]} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: 12
                  }}
                  formatter={(value: number) => [value.toFixed(3), 'R²']}
                />
                <Bar dataKey="r2" name="R² Score" radius={[4, 4, 0, 0]}>
                  {modelComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

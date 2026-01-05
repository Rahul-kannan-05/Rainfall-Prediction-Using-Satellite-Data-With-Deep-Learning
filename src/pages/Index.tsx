import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { performanceMetrics } from '@/lib/mockData';
import { 
  Cloud, Map, LineChart, Brain, BarChart3, ArrowRight,
  Droplets, Target, Gauge, TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 md:p-8">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Rainfall Prediction System
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-4">
              CNN-BiLSTM-Attention Hybrid Deep Learning Model for accurate rainfall prediction 
              using satellite data across India. Designed for academic research and meteorological applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/predict">
                  <Cloud className="mr-2 h-4 w-4" />
                  Start Prediction
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/model">
                  <Brain className="mr-2 h-4 w-4" />
                  View Architecture
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Cloud className="h-64 w-64" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Model Accuracy"
            value="92.3%"
            subtitle="R² Score"
            icon={<Target className="h-5 w-5" />}
            trend="up"
          />
          <MetricCard
            title="RMSE"
            value="8.42 mm"
            subtitle="Lower is better"
            icon={<Gauge className="h-5 w-5" />}
          />
          <MetricCard
            title="Coverage"
            value="28 States"
            subtitle="All India"
            icon={<Map className="h-5 w-5" />}
          />
          <MetricCard
            title="Data Points"
            value="365 days"
            subtitle="Historical analysis"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                AI-Powered Prediction
              </CardTitle>
              <CardDescription>
                Generate real-time rainfall predictions using satellite parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                <Link to="/predict">
                  Try Prediction <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Interactive Map
              </CardTitle>
              <CardDescription>
                Explore rainfall patterns across Indian states with interactive visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                <Link to="/map">
                  View Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Time Series Analysis
              </CardTitle>
              <CardDescription>
                Analyze historical trends and seasonal rainfall patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                <Link to="/timeseries">
                  View Charts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Model Architecture
              </CardTitle>
              <CardDescription>
                Explore the CNN-BiLSTM-Attention hybrid architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                <Link to="/model">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                View RMSE, MAE, R², and model comparison results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                <Link to="/performance">
                  View Metrics <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Academic Research
              </CardTitle>
              <CardDescription>
                Built for thesis documentation and research presentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive visualizations and metrics for academic papers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Summary</CardTitle>
            <CardDescription>
              Key metrics from CNN-BiLSTM-Attention model evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.name} className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-primary">
                    {metric.value}{metric.unit}
                  </p>
                  <p className="text-sm font-medium">{metric.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

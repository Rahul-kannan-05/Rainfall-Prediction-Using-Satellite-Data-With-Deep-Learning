import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PredictionResponse } from '@/types/rainfall';
import { CloudRain, Clock, Target, Brain, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResultProps {
  result: PredictionResponse;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'No Rain':
      return 'bg-muted text-muted-foreground';
    case 'Light':
      return 'bg-accent text-accent-foreground';
    case 'Moderate':
      return 'bg-chart-3 text-primary-foreground';
    case 'Heavy':
      return 'bg-chart-4 text-primary-foreground';
    case 'Very Heavy':
      return 'bg-chart-5 text-primary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const PredictionResult = ({ result }: PredictionResultProps) => {
  const { prediction, input, timestamp, modelVersion } = result;

  return (
    <div className="space-y-4">
      {/* Main Prediction */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CloudRain className="h-5 w-5" />
              Prediction Result
            </span>
            <Badge className={getCategoryColor(prediction.category)}>
              {prediction.category}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-5xl font-bold text-primary">
              {prediction.predictedRainfall.toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">mm of rainfall predicted</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium">{(prediction.confidence * 100).toFixed(1)}%</span>
            </div>
            <Progress value={prediction.confidence * 100} className="h-2" />
          </div>

          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">
            {prediction.explanation}
          </p>
        </CardContent>
      </Card>

      {/* Temporal Pattern */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            Temporal Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold">{prediction.temporalPattern.trend}</p>
              <p className="text-xs text-muted-foreground">Trend</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{prediction.temporalPattern.peakHour}:00</p>
              <p className="text-xs text-muted-foreground">Peak Hour</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{prediction.temporalPattern.duration}h</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Metrics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4" />
            Model Confidence Scores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Attention Score', value: prediction.modelMetrics.attentionScore },
            { label: 'Spatial Confidence', value: prediction.modelMetrics.spatialConfidence },
            { label: 'Temporal Confidence', value: prediction.modelMetrics.temporalConfidence },
          ].map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-medium">{(metric.value * 100).toFixed(1)}%</span>
              </div>
              <Progress value={metric.value * 100} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{input.latitude.toFixed(4)}°N, {input.longitude.toFixed(4)}°E</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{input.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Model Version</p>
              <p className="font-medium">{modelVersion}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Timestamp</p>
              <p className="font-medium">{new Date(timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

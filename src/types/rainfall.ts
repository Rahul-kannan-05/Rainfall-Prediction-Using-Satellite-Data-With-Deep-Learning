export interface SatelliteInput {
  latitude: number;
  longitude: number;
  cloudTopTemperature: number;
  infraredBrightness: number;
  waterVaporIndex: number;
  date: string;
}

export interface TemporalPattern {
  trend: 'Increasing' | 'Decreasing' | 'Stable' | 'Variable';
  peakHour: number;
  duration: number;
}

export interface ModelMetrics {
  attentionScore: number;
  spatialConfidence: number;
  temporalConfidence: number;
}

export interface RainfallPrediction {
  predictedRainfall: number;
  confidence: number;
  category: 'No Rain' | 'Light' | 'Moderate' | 'Heavy' | 'Very Heavy';
  temporalPattern: TemporalPattern;
  modelMetrics: ModelMetrics;
  explanation: string;
}

export interface PredictionResponse {
  success: boolean;
  input: SatelliteInput;
  prediction: RainfallPrediction;
  timestamp: string;
  modelVersion: string;
  error?: string;
}

export interface IndiaState {
  name: string;
  coordinates: [number, number];
  avgRainfall: number;
}

export interface TimeSeriesData {
  date: string;
  actual: number;
  predicted: number;
  error: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  description: string;
}

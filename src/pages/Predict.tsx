import { AppLayout } from '@/components/layout/AppLayout';
import { PredictionForm } from '@/components/prediction/PredictionForm';
import { PredictionResult } from '@/components/prediction/PredictionResult';
import { useRainfallPrediction } from '@/hooks/useRainfallPrediction';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const PredictPage = () => {
  const { predict, prediction, isLoading, error } = useRainfallPrediction();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Rainfall Prediction</h1>
          <p className="text-muted-foreground">
            Enter satellite-derived parameters to generate AI-powered rainfall predictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <PredictionForm onSubmit={predict} isLoading={isLoading} />
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>About the Model:</strong> This CNN-BiLSTM-Attention hybrid model 
                      combines convolutional neural networks for spatial feature extraction, 
                      bidirectional LSTM for temporal pattern recognition, and attention 
                      mechanisms for feature importance weighting.
                    </p>
                    <p>
                      <strong>Data Sources:</strong> Simulates predictions based on 
                      satellite parameters typically derived from INSAT-3D, GPM, and ERA5 datasets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {prediction ? (
              <PredictionResult result={prediction} />
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">No Prediction Yet</p>
                  <p className="text-sm">
                    Fill in the satellite parameters and click "Generate Rainfall Prediction" 
                    to see the AI-powered forecast.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PredictPage;

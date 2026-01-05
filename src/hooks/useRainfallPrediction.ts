import { useState } from 'react';
import { SatelliteInput, PredictionResponse } from '@/types/rainfall';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useRainfallPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = async (input: SatelliteInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('rainfall-predict', {
        body: input,
      });

      if (invokeError) {
        throw new Error(invokeError.message);
      }

      if (data.error) {
        if (data.error.includes('Rate limit')) {
          toast.error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (data.error.includes('credits')) {
          toast.error('AI credits exhausted. Please add more credits in your workspace settings.');
        } else {
          toast.error(data.error);
        }
        setError(data.error);
        return null;
      }

      setPrediction(data);
      toast.success('Rainfall prediction generated successfully!');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate prediction';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setPrediction(null);
    setError(null);
  };

  return { predict, prediction, isLoading, error, reset };
};

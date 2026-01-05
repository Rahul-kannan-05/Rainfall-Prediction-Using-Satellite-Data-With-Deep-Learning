import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Layers, ArrowRight, Zap, Eye } from 'lucide-react';

export const ModelArchitecture = () => {
  const layers = [
    {
      name: 'Input Layer',
      type: 'input',
      description: 'Satellite imagery features',
      specs: ['Cloud Top Temperature', 'IR Brightness', 'Water Vapor Index', 'Temporal Features'],
      color: 'bg-chart-1',
    },
    {
      name: 'CNN Block',
      type: 'cnn',
      description: 'Spatial feature extraction',
      specs: ['Conv2D (64 filters, 3×3)', 'BatchNorm + ReLU', 'MaxPooling (2×2)', 'Conv2D (128 filters, 3×3)'],
      color: 'bg-chart-2',
    },
    {
      name: 'BiLSTM Block',
      type: 'bilstm',
      description: 'Temporal pattern learning',
      specs: ['Forward LSTM (256 units)', 'Backward LSTM (256 units)', 'Dropout (0.3)', 'Dense (128 units)'],
      color: 'bg-chart-3',
    },
    {
      name: 'Attention Layer',
      type: 'attention',
      description: 'Feature importance weighting',
      specs: ['Multi-Head Attention (8 heads)', 'Query-Key-Value Mechanism', 'Softmax Normalization', 'Context Vector'],
      color: 'bg-chart-5',
    },
    {
      name: 'Output Layer',
      type: 'output',
      description: 'Rainfall prediction',
      specs: ['Dense (64 units)', 'Dense (1 unit)', 'Linear Activation', 'Rainfall Value (mm)'],
      color: 'bg-chart-4',
    },
  ];

  const hyperparameters = [
    { name: 'Learning Rate', value: '0.001' },
    { name: 'Batch Size', value: '32' },
    { name: 'Epochs', value: '100' },
    { name: 'Optimizer', value: 'Adam' },
    { name: 'Loss Function', value: 'MSE' },
    { name: 'Sequence Length', value: '24h' },
  ];

  return (
    <div className="space-y-6">
      {/* Architecture Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            CNN-BiLSTM-Attention Architecture
          </CardTitle>
          <CardDescription>
            Hybrid deep learning model for rainfall prediction using satellite data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4 overflow-x-auto">
            {layers.map((layer, index) => (
              <div key={layer.name} className="flex items-center gap-4">
                <div className={`${layer.color} text-primary-foreground p-4 rounded-lg min-w-[180px] shadow-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4" />
                    <span className="font-semibold text-sm">{layer.name}</span>
                  </div>
                  <p className="text-xs opacity-90 mb-2">{layer.description}</p>
                  <div className="space-y-1">
                    {layer.specs.map((spec, i) => (
                      <p key={i} className="text-xs opacity-75">• {spec}</p>
                    ))}
                  </div>
                </div>
                {index < layers.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Data Processing Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Data Acquisition', desc: 'Satellite imagery from INSAT-3D, GPM, and ERA5 datasets' },
              { step: 2, title: 'Preprocessing', desc: 'Normalization, temporal alignment, and spatial interpolation' },
              { step: 3, title: 'Feature Extraction', desc: 'CNN extracts spatial features, BiLSTM captures temporal patterns' },
              { step: 4, title: 'Prediction', desc: 'Attention-weighted features produce rainfall estimates' },
            ].map((item) => (
              <div key={item.step} className="p-4 border rounded-lg">
                <Badge variant="outline" className="mb-2">Step {item.step}</Badge>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attention Mechanism */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Attention Mechanism Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">How Attention Works</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  1. <span className="font-medium text-foreground">Query-Key-Value</span>: 
                  The BiLSTM outputs are transformed into Q, K, V matrices
                </p>
                <p>
                  2. <span className="font-medium text-foreground">Attention Scores</span>: 
                  Computed as softmax(QK^T / √d_k) to identify important time steps
                </p>
                <p>
                  3. <span className="font-medium text-foreground">Context Vector</span>: 
                  Weighted sum of values focuses on rainfall-relevant patterns
                </p>
                <p>
                  4. <span className="font-medium text-foreground">Multi-Head</span>: 
                  8 parallel attention heads capture different aspects
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Hyperparameters</h4>
              <div className="grid grid-cols-2 gap-2">
                {hyperparameters.map((param) => (
                  <div key={param.name} className="flex justify-between p-2 bg-muted rounded text-sm">
                    <span className="text-muted-foreground">{param.name}</span>
                    <span className="font-medium">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

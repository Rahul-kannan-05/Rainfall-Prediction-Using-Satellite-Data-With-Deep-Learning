import { AppLayout } from '@/components/layout/AppLayout';
import { ModelArchitecture } from '@/components/model/ModelArchitecture';

const ModelPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Model Architecture</h1>
          <p className="text-muted-foreground">
            Detailed view of the CNN-BiLSTM-Attention hybrid deep learning architecture
          </p>
        </div>

        <ModelArchitecture />
      </div>
    </AppLayout>
  );
};

export default ModelPage;

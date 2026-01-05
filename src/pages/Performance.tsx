import { AppLayout } from '@/components/layout/AppLayout';
import { PerformanceMetrics } from '@/components/performance/PerformanceMetrics';

const PerformancePage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Performance Metrics</h1>
          <p className="text-muted-foreground">
            Comprehensive model evaluation metrics and comparison with baseline algorithms
          </p>
        </div>

        <PerformanceMetrics />
      </div>
    </AppLayout>
  );
};

export default PerformancePage;

import { IndiaState, TimeSeriesData, PerformanceMetric } from '@/types/rainfall';

export const indiaStates: IndiaState[] = [
  { name: 'Maharashtra', coordinates: [75.7139, 19.7515], avgRainfall: 95 },
  { name: 'Kerala', coordinates: [76.2711, 10.8505], avgRainfall: 145 },
  { name: 'Karnataka', coordinates: [75.7139, 15.3173], avgRainfall: 85 },
  { name: 'Tamil Nadu', coordinates: [78.6569, 11.1271], avgRainfall: 65 },
  { name: 'Andhra Pradesh', coordinates: [79.7400, 15.9129], avgRainfall: 55 },
  { name: 'Telangana', coordinates: [79.0193, 18.1124], avgRainfall: 70 },
  { name: 'Gujarat', coordinates: [71.1924, 22.2587], avgRainfall: 45 },
  { name: 'Rajasthan', coordinates: [74.2179, 27.0238], avgRainfall: 25 },
  { name: 'Madhya Pradesh', coordinates: [78.6569, 22.9734], avgRainfall: 60 },
  { name: 'Uttar Pradesh', coordinates: [80.9462, 26.8467], avgRainfall: 55 },
  { name: 'Bihar', coordinates: [85.3131, 25.0961], avgRainfall: 75 },
  { name: 'West Bengal', coordinates: [87.8550, 22.9868], avgRainfall: 110 },
  { name: 'Odisha', coordinates: [85.0985, 20.9517], avgRainfall: 90 },
  { name: 'Assam', coordinates: [92.9376, 26.2006], avgRainfall: 165 },
  { name: 'Punjab', coordinates: [75.3412, 31.1471], avgRainfall: 40 },
  { name: 'Haryana', coordinates: [76.0856, 29.0588], avgRainfall: 35 },
  { name: 'Himachal Pradesh', coordinates: [77.1734, 31.1048], avgRainfall: 85 },
  { name: 'Uttarakhand', coordinates: [79.0193, 30.0668], avgRainfall: 95 },
  { name: 'Jharkhand', coordinates: [85.2799, 23.6102], avgRainfall: 80 },
  { name: 'Chhattisgarh', coordinates: [81.8661, 21.2787], avgRainfall: 75 },
  { name: 'Goa', coordinates: [74.1240, 15.2993], avgRainfall: 130 },
  { name: 'Meghalaya', coordinates: [91.3662, 25.4670], avgRainfall: 180 },
  { name: 'Manipur', coordinates: [93.9063, 24.6637], avgRainfall: 120 },
  { name: 'Mizoram', coordinates: [92.9376, 23.1645], avgRainfall: 140 },
  { name: 'Nagaland', coordinates: [94.5624, 26.1584], avgRainfall: 115 },
  { name: 'Tripura', coordinates: [91.9882, 23.9408], avgRainfall: 125 },
  { name: 'Arunachal Pradesh', coordinates: [94.7278, 28.2180], avgRainfall: 155 },
  { name: 'Sikkim', coordinates: [88.5122, 27.5330], avgRainfall: 135 },
];

export const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate monsoon pattern (June-September higher rainfall)
    const month = date.getMonth();
    const isMonsoon = month >= 5 && month <= 8;
    const baseRainfall = isMonsoon ? 80 : 20;
    const variation = (Math.random() - 0.5) * 40;
    
    const actual = Math.max(0, baseRainfall + variation + Math.sin(i / 30) * 15);
    const predicted = actual + (Math.random() - 0.5) * 15;
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual: Math.round(actual * 10) / 10,
      predicted: Math.round(predicted * 10) / 10,
      error: Math.round(Math.abs(actual - predicted) * 10) / 10,
    });
  }
  
  return data;
};

export const performanceMetrics: PerformanceMetric[] = [
  { name: 'RMSE', value: 8.42, unit: 'mm', description: 'Root Mean Square Error' },
  { name: 'MAE', value: 6.18, unit: 'mm', description: 'Mean Absolute Error' },
  { name: 'R²', value: 0.923, unit: '', description: 'Coefficient of Determination' },
  { name: 'Correlation', value: 0.961, unit: '', description: 'Pearson Correlation Coefficient' },
  { name: 'NSE', value: 0.891, unit: '', description: 'Nash-Sutcliffe Efficiency' },
  { name: 'MAPE', value: 12.4, unit: '%', description: 'Mean Absolute Percentage Error' },
];

export const trainingHistory = Array.from({ length: 100 }, (_, i) => ({
  epoch: i + 1,
  trainLoss: 0.8 * Math.exp(-i / 30) + 0.05 + Math.random() * 0.02,
  valLoss: 0.85 * Math.exp(-i / 28) + 0.06 + Math.random() * 0.025,
}));

export const modelComparison = [
  { model: 'CNN-BiLSTM-Attention', rmse: 8.42, mae: 6.18, r2: 0.923 },
  { model: 'LSTM', rmse: 12.85, mae: 9.42, r2: 0.856 },
  { model: 'Random Forest', rmse: 15.21, mae: 11.35, r2: 0.812 },
  { model: 'SVM', rmse: 18.67, mae: 14.22, r2: 0.764 },
  { model: 'Linear Regression', rmse: 22.34, mae: 17.89, r2: 0.698 },
];

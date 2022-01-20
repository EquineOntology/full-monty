export type AnalysisApiResponse = {
  estimate: number;
  sampleSize: number;
  successRate: number;
  averageDelta: number;
  medianDelta: number;
  standardDeviation: number;
  message?: string;
};

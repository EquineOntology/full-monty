export type AnalysisApiResponse = {
  estimate: number;
  sampleSize: number;
  successRate: number;
  meanDuration: number;
  meanDelta: number;
  medianDuration: number;
  medianDelta: number;
  sigmaDuration: number;
  message?: string;
};

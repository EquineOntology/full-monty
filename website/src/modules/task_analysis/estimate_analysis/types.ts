export type AnalysisApiResponse = {
  estimate: number;
  sampleSize: number;
  successRate: number;
  meanDuration: number;
  medianDuration: number;
  medianDelta: number;
  sigmaDuration: number;
  message?: string;
};

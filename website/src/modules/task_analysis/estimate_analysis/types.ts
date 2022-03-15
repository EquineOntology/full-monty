export type AnalysisApiResponse = {
  estimate: number;
  sampleSize: number;
  successRate: number;
  meanDuration: number;
  medianDuration: number;
  medianDelta: number;
  sigmaDuration: number;
  message?: string;
  graphs: {
    histogram: { min: number; max: number; amount: number }[];
    scatterplot: { x: number; y: number }[];
  };
};

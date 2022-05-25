export type ChartSeries = {
  name?: string;
  type?: string;
  color?: string;
}[];

export type BarChartSeries = ChartSeries &
  {
    data: number[];
  }[];

export type BarDescription = {
  min: number;
  max: number;
  amount: number;
};

export type Point = {
  x: number;
  y: number;
};

export type ScatterPlotSeries = ChartSeries &
  {
    data: {
      x: any;
      y: any;
      fillColor?: string;
      strokeColor?: string;
      meta?: any;
      goals?: any;
    }[];
  }[];

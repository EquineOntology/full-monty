export type Point = {
  x: number;
  y: number;
};

export type BarDescription = {
  min: number;
  max: number;
  amount: number;
};

type ChartSeries = {
  name?: string;
  type?: string;
  color?: string;
}[];

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

export type BarChartSeries = ChartSeries &
  {
    data: number[];
  }[];

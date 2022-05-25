import { isNumeric } from "./TypeChecker";

export function computeScatterPlot(
  dataset: Datum[],
  xAttribute: string,
  yAttribute: string
): ScatterplotPoint[] {
  const values: ScatterplotPoint[] = [];
  dataset.forEach((datapoint) => {
    if (
      datapoint[xAttribute] === undefined ||
      datapoint[yAttribute] === undefined ||
      !isNumeric(datapoint[xAttribute]) ||
      !isNumeric(datapoint[yAttribute])
    ) {
      return;
    }

    values.push({ x: datapoint[xAttribute], y: datapoint[yAttribute] });
  });

  return values;
}

export function computeHistogram(dataset: number[]): HistogramBar[] {
  let min = Math.min(...dataset);
  let max = Math.max(...dataset);
  const singleRange = (max - min) / 10;
  const ranges: HistogramBar[] = [];
  const maximums: number[] = [];
  for (let i = 0; i < 10; i++) {
    const rangeMin = Math.round(min + i * singleRange);
    const rangeMax = Math.round(rangeMin + singleRange);
    ranges.push({ min: rangeMin, max: rangeMax, amount: 0 });
    maximums.push(min + (i + 1) * singleRange);
  }

  dataset.forEach((datum) => {
    for (let i = 0; i < maximums.length; i++) {
      if (datum > maximums[i]) continue;

      ranges[i].amount += 1;
      break;
    }
  });

  return ranges;
}

type HistogramBar = {
  min: number;
  max: number;
  amount: number;
};

type ScatterplotPoint = {
  x: number;
  y: number;
};

type Datum = {
  [key: string]: number;
};

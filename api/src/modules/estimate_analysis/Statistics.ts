export function average(values: number[]) {
  const result = values.reduce(sum, 0) / values.length;

  return result;
}

export function median(values: number[]) {
  const sortedValues = [...values].sort();
  var halfwayDelta = Math.floor(sortedValues.length / 2);

  const evenAmountOfDeltas = sortedValues.length % 2 === 0;
  const result = evenAmountOfDeltas
    ? (sortedValues[halfwayDelta - 1] + sortedValues[halfwayDelta]) / 2
    : sortedValues[halfwayDelta];

  return result;
}

export function variance(values: number[]) {
  const average = values.reduce(sum, 0) / values.length;

  const deltas: number[] = [];
  for (let i = 0; i < values.length; i++) {
    deltas[i] = Math.pow(values[i] - average, 2);
  }

  return deltas.reduce(sum, 0) / deltas.length;
}

function sum(total: number, current: number) {
  return total + current;
}

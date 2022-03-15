/** Calculate the arithmetic average of the given set */
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

/** Calculate the _weighted_ average of the given set */
export function mean(values: number[]) {
  const frequencies = extractFrequencies(values);

  const uniqueValues = Object.keys(frequencies);
  let weightedAverage = 0;
  for (let i = 0; i < uniqueValues.length; i++) {
    const pick = parseInt(uniqueValues[i]);
    const absoluteFrequency = frequencies[pick];

    // values.length is, by definition, the sum of all frequencies (CF 22.01.22).
    weightedAverage += pick * (absoluteFrequency / values.length);
  }

  return weightedAverage;
}

export function variance(values: number[]) {
  // Since we are enumerating the _entire_ population, we can do with a simple
  // average instead of computing the mean (weighted average). If the code
  // chnges to only consider a subset, use the _mean_ (CF 22.01.22).
  const avg = average(values);

  const deltas: number[] = [];
  for (let i = 0; i < values.length; i++) {
    deltas[i] = Math.pow(values[i] - avg, 2);
  }

  return deltas.reduce(sum, 0) / deltas.length;
}

function sum(firstAddend: number, secondAddend: number) {
  return firstAddend + secondAddend;
}

function extractFrequencies(values: number[]) {
  const frequencies: { [key: number]: number } = {};

  for (let i = 0; i < values.length; i++) {
    const pick = values[i];
    const frequency = frequencies[pick] ?? 0;
    frequencies[pick] = frequency + 1;
  }

  return frequencies;
}

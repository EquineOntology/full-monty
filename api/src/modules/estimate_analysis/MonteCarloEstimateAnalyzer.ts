import { get as getFromDb } from "../../services/MongoConnector";
import InsufficientDataError from "../arch/api/InsufficientDataError";

export default class MonteCarloEstimateAnalyzer {
  #TOTAL_RUNS: number = 1_000_000;

  async analyze(initialEstimate: number, project?: string, category?: string) {
    const estimateInSeconds = initialEstimate * 60;
    const durations = await this.#retrieveTaskDurations(
      estimateInSeconds,
      project,
      category
    );

    const { successes, deltas } = this.#simulate(estimateInSeconds, durations);

    // Probability estimate is equal or higher than what is "normally" necessary (CF 19.01.22).
    const successRate = successes / this.#TOTAL_RUNS;

    return {
      successRate,
      meanDelta: this.#computeMeanDelta(deltas),
      medianDelta: this.#computeMedianDelta(deltas),
    };
  }

  #computeMeanDelta(deltas: number[]) {
    const sum = (total: number, current: number) => total + current;
    const meanDelta = deltas.reduce(sum, 0) / deltas.length;

    const meanInMinutes = meanDelta / 60;
    return Math.round(meanInMinutes);
  }

  #computeMedianDelta(unsortedDeltas: number[]) {
    const deltas = [...unsortedDeltas].sort();
    var halfwayDelta = Math.floor(deltas.length / 2);

    const evenAmountOfDeltas = deltas.length % 2 === 0;
    const medianDelta = evenAmountOfDeltas
      ? (deltas[halfwayDelta - 1] + deltas[halfwayDelta]) / 2
      : deltas[halfwayDelta];

    const medianInMinutes = medianDelta / 60;

    return Math.round(medianInMinutes);
  }

  async #retrieveTaskDurations(
    estimatedSeconds: number,
    project?: string,
    category?: string
  ): Promise<number[]> {
    const filters: { estimate: number; project?: string; category?: string } = {
      estimate: estimatedSeconds,
    };

    if (project) {
      filters.project = project;
    }
    if (category) {
      filters.category = category;
    }

    const fieldFilter = { duration: true };
    const tasks = await getFromDb("marvin_tasks", filters, { fieldFilter });

    if (tasks.length === 0) {
      throw new InsufficientDataError();
    }

    return tasks.map((task) => {
      return task.duration;
    });
  }

  #simulate(estimate: number, durations: number[]) {
    let timesEstimateWasHigherThanDuration = 0;
    const deltas: number[] = [];
    for (let i = 0; i < this.#TOTAL_RUNS; i++) {
      const pickIndex = Math.floor(Math.random() * durations.length);
      const actualTime = durations[pickIndex];
      deltas[i] = actualTime - estimate;
      if (actualTime <= estimate) {
        timesEstimateWasHigherThanDuration += 1;
      }
    }

    return {
      successes: timesEstimateWasHigherThanDuration,
      deltas: deltas,
    };
  }
}

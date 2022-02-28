import { get as getFromDb } from "../arch/database/MongoConnector";
import InsufficientDataError from "../arch/api/InsufficientDataError";
import { median, variance, mean } from "../../libs/Statistics";

export default class MonteCarloEstimateAnalyzer {
  #TOTAL_RUNS: number = 1_000_000;

  async analyze(estimate: number, project?: string, category?: string) {
    const estimateInSeconds = estimate * 60;
    const durations = await this.#retrieveTaskDurations(
      estimateInSeconds,
      project,
      category
    );

    const deltas = this.#computeDeltas(estimateInSeconds, durations);

    const successes = this.#simulate(estimateInSeconds, durations);
    const successRate = successes / this.#TOTAL_RUNS;
    const meanDurationInMinutes = mean(durations) / 60;
    const medianDurationInMinutes = Math.round(median(durations) / 60);
    const medianDeltaInMinutes = Math.round(median(deltas) / 60);
    // Sigma = Standard Deviation (CF 22.01.22).
    const sigmaDurationInMinutes = Math.round(
      Math.sqrt(variance(durations)) / 60
    );

    return {
      estimate: estimate,
      sampleSize: durations.length,
      successRate: parseFloat(successRate.toFixed(2)),
      meanDuration: parseFloat(meanDurationInMinutes.toFixed(2)),
      medianDuration: medianDurationInMinutes,
      medianDelta: medianDeltaInMinutes,
      sigmaDuration: sigmaDurationInMinutes,
    };
  }

  #computeDeltas(estimate: number, durations: number[]) {
    const deltas: number[] = [];
    for (let i = 0; i < durations.length; i++) {
      const pick = durations[i];
      deltas.push(pick - estimate);
    }

    return deltas;
  }

  async #retrieveTaskDurations(
    estimatedSeconds: number,
    project?: string,
    category?: string
  ): Promise<number[]> {
    const fiftyPercent = Math.round((estimatedSeconds / 100) * 50);

    const lowerBound = estimatedSeconds - fiftyPercent;
    const upperBound = estimatedSeconds + fiftyPercent;

    const filters: { estimate: object; project?: string; category?: string } = {
      estimate: { $gte: lowerBound, $lte: upperBound },
    };

    if (project) {
      filters.project = project;
    }
    if (category) {
      filters.category = category;
    }

    const fieldFilter = { duration: true, estimate: true, ratio: true };
    const tasks = await getFromDb("marvin_tasks", filters, { fieldFilter });

    if (tasks.length === 0) {
      throw new InsufficientDataError();
    }

    return tasks.map((task) => {
      if (task.estimate === estimatedSeconds) return task.duration;
      return Math.round(task.ratio * estimatedSeconds);
    });
  }

  #simulate(estimate: number, durations: number[]) {
    let timesEstimateWasHigherThanDuration = 0;
    for (let i = 0; i < this.#TOTAL_RUNS; i++) {
      const pickIndex = Math.floor(Math.random() * durations.length);
      const actualTime = durations[pickIndex];
      if (actualTime <= estimate) {
        timesEstimateWasHigherThanDuration += 1;
      }
    }

    return timesEstimateWasHigherThanDuration;
  }
}

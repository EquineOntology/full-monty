import { get as getFromDb } from "../../services/MongoConnector";
import InsufficientDataError from "../arch/api/InsufficientDataError";
import { average, median, variance } from "./Statistics";

export default class MonteCarloEstimateAnalyzer {
  #TOTAL_RUNS: number = 1_000_000;

  async analyze(estimate: number, project?: string, category?: string) {
    const estimateInSeconds = estimate * 60;
    const durations = await this.#retrieveTaskDurations(
      estimateInSeconds,
      project,
      category
    );

    const { successes, deltas } = this.#simulate(estimateInSeconds, durations);

    const successRate = parseFloat((successes / this.#TOTAL_RUNS).toFixed(2));
    const averageDeltaInMinutes = Math.round(average(deltas) / 60);
    const medianDeltaInMinutes = Math.round(median(deltas) / 60);
    const standardDeviation = Math.sqrt(variance(durations));

    return {
      estimate: estimate,
      averageDelta: averageDeltaInMinutes,
      medianDelta: medianDeltaInMinutes,
      standardDeviation: standardDeviation,
      successRate: successRate,
    };
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

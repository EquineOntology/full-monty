import { get as getFromDb } from "../arch/database/MongoConnector";
import InsufficientDataError from "../arch/api/InsufficientDataError";
import { median, variance, mean } from "../../libs/Statistics";
import { Document } from "mongodb";
import { computeHistogram, computerScatterPlot } from "../../libs/Plotter";

export default class MonteCarloEstimateAnalyzer {
  #TOTAL_RUNS: number = 1_000_000;

  async analyze(estimate: number, project?: string, category?: string) {
    const estimateInSeconds = estimate * 60;
    const tasks = await this.#retrieveTasks(
      estimateInSeconds,
      project,
      category
    );

    const durations = this.#extractDurations(tasks, estimateInSeconds);
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
      graphs: {
        scatterplot: computerScatterPlot(tasks, "estimate", "duration"),
        histogram: computeHistogram(durations),
      },
    };
  }

  #calculateBoundsOfEstimate(estimate: number): [number, number] {
    let lowerBound;
    let upperBound;
    const onePercent = Math.round(estimate / 100);
    if (estimate <= 15 * 60) {
      lowerBound = 0;
      upperBound = 30 * 60;
    } else if (estimate <= 30 * 60) {
      lowerBound = 15 * 60;
      upperBound = 45 * 60;
    } else if (estimate <= 60 * 60) {
      const seventyFivePercent = 75 * onePercent;
      lowerBound = estimate - seventyFivePercent;
      upperBound = estimate + seventyFivePercent;
    } else if (estimate <= 120 * 60) {
      const fiftyPercent = 50 * onePercent;
      lowerBound = estimate - fiftyPercent;
      upperBound = estimate + fiftyPercent;
    } else {
      const twentyFivePercent = 25 * onePercent;
      lowerBound = estimate - twentyFivePercent;
      upperBound = estimate + twentyFivePercent;
    }

    return [lowerBound, upperBound];
  }

  #computeDeltas(estimate: number, durations: number[]) {
    const deltas: number[] = [];
    for (let i = 0; i < durations.length; i++) {
      const pick = durations[i];
      deltas.push(pick - estimate);
    }

    return deltas;
  }

  #extractDurations(tasks: Document[], originalEstimate: number): number[] {
    return tasks.map((task) => {
      if (task.estimate === originalEstimate) return task.duration;
      return Math.round(task.ratio * originalEstimate);
    });
  }

  async #retrieveTasks(
    estimatedSeconds: number,
    project?: string,
    category?: string
  ): Promise<Document[]> {
    const [lowerBound, upperBound] =
      this.#calculateBoundsOfEstimate(estimatedSeconds);

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

    return tasks;
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

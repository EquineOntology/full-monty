import Datastore from "@/datastore";
import { computeHistogram, computeScatterPlot } from "@/helpers/Plotter";
import { mean, median, variance } from "@/helpers/Statistics";
import InsufficientDataError from "@/modules/api/InsufficientDataError";

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
        scatterplot: computeScatterPlot(tasks, "estimate", "duration"),
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

  #extractDurations(
    tasks: Record<string, any>[],
    originalEstimate: number
  ): number[] {
    const tasksWithDuration = tasks.filter((task) => task.duration !== null);
    return tasksWithDuration.map((task) => {
      if (!task.duration) return;
      if (task.estimate === originalEstimate) return task.duration;
      return Math.round(task.ratio * originalEstimate);
    });
  }

  async #retrieveTasks(
    estimatedSeconds: number,
    project?: string,
    category?: string
  ): Promise<Record<string, any>[]> {
    const [lowerBound, upperBound] =
      this.#calculateBoundsOfEstimate(estimatedSeconds);

    const filters: {
      estimate: { between: [number, number] };
      project?: string;
      category?: string;
    } = {
      estimate: { between: [lowerBound, upperBound] },
    };
    if (project) {
      filters.project = project;
    }
    if (category) {
      filters.category = category;
    }

    const tasks = await Datastore.get("tasks", {
      filter: filters,
      returnFields: ["duration", "estimate", "ratio"],
    });

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

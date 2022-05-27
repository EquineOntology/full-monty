import fs from "fs";
import Task from "@/models/Task";
import CsvParser from "@/utils/CsvParser";
import Job from "../../modules/arch/queues/Job";
import { index as getSettings } from "../../modules/task_analysis/import/ImportSettingsController";

type Options = {
  file: string | null;
};

export default class ImportTasksFromMarvin extends Job {
  name = "ImportTasksFromMarvin";
  priority = 1;

  declare data: Options;

  #exclusionList: string[] = [];
  #useEstimateWhenDurationMissing = false;

  async handle() {
    const { exclusionList, useEstimateWhenDurationMissing } =
      await getSettings();
    this.#exclusionList = exclusionList ?? [];
    this.#useEstimateWhenDurationMissing =
      useEstimateWhenDurationMissing ?? false;

    if (!this.data.file) {
      this.fail(new Error("Missing file path on ImportTasksFromMarvin job"));
      return;
    }

    fs.access(this.data.file, (err) => {
      if (err) {
        this.#deleteFile();
        this.fail(err);
        return;
      }

      if (!this.data.file) {
        this.fail(new Error("Missing file path on ImportTasksFromMarvin job"));
        return;
      }

      CsvParser.parseFile(
        this.data.file,
        this.#processTask.bind(this),
        this.end.bind(this)
      );
    });
  }

  end() {
    this.#deleteFile();
    super.end();
  }

  #deleteFile() {
    if (!this.data.file) return;

    fs.unlink(this.data.file, () => {
      console.info(`File "${this.data.file}" deleted`);
    });
  }

  async #processTask(input: Record<string, any>) {
    const isNotDone = input.DONE !== "Y";
    const hasNoEstimate = !input.TIME_ESTIMATE || input.TIME_ESTIMATE === "0";
    if (isNotDone || hasNoEstimate) return;

    if (this.#exclusionList.includes(input.TITLE)) return;

    const hasDuration = input.DURATION !== null && input.DURATION !== "0";
    if (!this.#useEstimateWhenDurationMissing && !hasDuration) return;

    const duration = hasDuration ? input.DURATION : input.TIME_ESTIMATE;

    const durationInSeconds = Math.round(parseInt(duration) / 1000);
    const estimateInSeconds = Math.round(parseInt(input.TIME_ESTIMATE) / 1000);

    try {
      const task = new Task(
        input.ID,
        input.TITLE,
        input.DONE,
        input.PATH,
        durationInSeconds,
        estimateInSeconds,
        durationInSeconds / estimateInSeconds
      );
      await task.save();
    } catch (e) {
      throw e;
    }
  }

  static hydrate(
    attributes: Record<string, any>,
    options: Options
  ): ImportTasksFromMarvin {
    let job = new ImportTasksFromMarvin(options);
    job = Object.assign(job, attributes);
    if (typeof job.data === "string") {
      job.data = JSON.parse(job.data);
    }
    return job;
  }
}

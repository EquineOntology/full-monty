export type ConsoleLevel = "log" | "info" | "warn" | "error";

export interface JobInterface {
  id: string;
  name: string;
  collection: string;
  status: JobStatus;
  addedAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;

  handle: () => void;

  onEnd: () => void;

  report: (message: string, level: ConsoleLevel) => void;

  run: () => void;

  dump: () => {
    id: string;
    attributes: object;
    options?: object;
  };
}

export type JobStatus = "pending" | "started" | "completed" | "failed";

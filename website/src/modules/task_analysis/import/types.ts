export type JobDescription = {
  name: string;
  status: JobStatus;
  addedAt: string;
  completedAt: string | null;
};

export type JobStatus = "pending" | "started" | "failed" | "completed";

export type StatusColor = "yellow" | "blue" | "red" | "green";

export type ImportSettings = {
  exclusionList: string[];
  useEstimateWhenDurationMissing: boolean;
};

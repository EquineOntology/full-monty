export type JobDescription = {
  name: string;
  status: JobStatus;
  addedAt: string;
  completedAt: string | null;
};

export type JobStatus = "pending" | "started" | "failed" | "completed";

export type JobStatusColor = "yellow" | "blue" | "red" | "green";

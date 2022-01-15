import Job from "./Job";

export default class TestJob extends Job {
  name = "test-job";
  added_at: Date;

  constructor() {
    super();
    this.added_at = new Date();
  }

  dump(): object {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      priority: this.priority,
      added_at: this.added_at,
      started_at: this.started_at,
      completed_at: this.completed_at,
    };
  }

  handle() {
    console.log("Task is running every minute " + new Date());
  }
}

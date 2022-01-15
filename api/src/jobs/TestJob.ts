import Job from "./Job";

export default class TestJob extends Job {
  name = "TestJob";
  priority = 1;
  addedAt: Date;

  constructor() {
    super();
    this.addedAt = new Date();
  }

  dump() {
    return {
      id: this.id,
      attributes: {
        name: this.name,
        status: this.status,
        priority: this.priority,
        addedAt: this.addedAt,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
      },
    };
  }

  handle() {
    console.log("Task is running every minute " + new Date());
  }
}

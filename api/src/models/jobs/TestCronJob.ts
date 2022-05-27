import Job from "../../modules/arch/queues/Job";

export default class TestCronJob extends Job {
  name = "TestCronJob";
  priority = 1;

  handle() {
    console.log("Task is running every minute " + new Date());
    this.end();
  }

  static hydrate(attributes: Record<string, any>): TestCronJob {
    const job = new TestCronJob();
    return Object.assign(job, attributes);
  }
}

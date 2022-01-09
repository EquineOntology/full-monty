import Job from "./Job";

export default class TestJob extends Job {
  id = "test-job";
  priority = 1;

  handle() {
    console.log("Task is running every minute " + new Date());
  }
}

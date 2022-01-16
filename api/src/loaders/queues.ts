import Queue from "../modules/queues/Queue";

export default (): Record<number, Queue> => {
  const queues: Record<number, Queue> = {};

  for (let priority = 1; priority <= 3; priority++) {
    queues[priority] = new Queue(priority);
  }

  // Ideally we would fire an event when adding a job so that the queue handler can check
  // if any other jobs are already in progress, and also fire an event when each job has
  // been completed to start the next one. For now it's overkill (CF 19.12.21).
  setInterval(function () {
    const hadWork = processQueues(queues);
    if (!hadWork) {
      loadQueues(queues);
    }
  }, 5000);

  return queues;
};

function loadQueues(queues: Record<number, Queue>): void {
  for (let priority = 1; priority <= 3; priority++) {
    queues[priority].load();
  }
}

function processQueues(queues: Record<number, Queue>): boolean {
  let totalJobs = 0;
  for (let priority = 1; priority <= 3; priority++) {
    const queue = queues[priority];

    const queuedJobs = queue.size();
    if (queuedJobs === 0) continue;
    totalJobs += queuedJobs;

    console.info(`Processing queue #${priority}: ${queue.size()} job(s) found`);
    queue.work();
    break;
  }

  return totalJobs > 0;
}

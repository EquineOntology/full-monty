import Queue from "../services/Queue";

export default (): Record<number, Queue> => {
  const queues: Record<number, Queue> = {};

  for (let priority = 1; priority <= 3; priority++) {
    queues[priority] = new Queue(priority);
  }

  // Ideally we would fire an event when adding a job so that the queue handler can check
  // if any other jobs are already in progress, and also fire an event when each job has
  // been completed to start the next one. For now it's overkill (CF 19.12.21).
  setInterval(function () {
    processQueues(queues);
  }, 1000);

  return queues;
};

function processQueues(queues: Record<number, Queue>) {
  for (let priority = 1; priority <= 3; priority++) {
    const queue = queues[priority];
    if (queue.size() === 0) continue;

    console.info(`Processing queue #${priority}: ${queue.size()} job(s) found`);
    queue.work();
    break;
  }
}

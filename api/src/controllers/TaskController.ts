import Task from "@/models/Task";

export async function create(
  id: string,
  title: string,
  done: "Y" | "N",
  category: string,
  duration: number,
  time_estimate: number
) {
  try {
    const task = new Task(
      id,
      title,
      done,
      category,
      duration,
      time_estimate,
      duration / time_estimate
    );
    await task.save();
    return task;
  } catch (e) {
    throw new Error("Could not create task.");
  }
}

export async function clear() {
  try {
    await Task.clear();
  } catch (e) {
    throw new Error("Could not delete all tasks.");
  }

  return true;
}

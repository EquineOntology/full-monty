import Task from "@/models/Task";

export async function clear() {
  try {
    await Task.clear();
  } catch (e) {
    throw new Error("Could not delete all tasks.");
  }

  return true;
}

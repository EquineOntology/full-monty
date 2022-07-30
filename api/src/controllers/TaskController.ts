import Task from "@/models/Task";
import axios from "axios";

export async function create(
  id: string,
  title: string,
  done: "Y" | "N",
  projectId: string,
  duration: number,
  timeEstimate: number
) {
  try {
    const projectName = await getProjectRecursive(projectId);
    const task = new Task(
      id,
      title,
      done,
      projectName,
      duration,
      timeEstimate,
      duration / timeEstimate
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

async function getProjectRecursive(projectId: string) {
  if (!process.env.MARVIN_FULL_ACCESS_TOKEN) {
    console.error("Missing MARVIN_FULL_ACCESS_TOKEN");
    throw new Error("Missing MARVIN_FULL_ACCESS_TOKEN");
  }

  const url = `https://serv.amazingmarvin.com/api/doc?id=${projectId}`;
  const options = {
    headers: {
      "X-Full-Access-Token": process.env.MARVIN_FULL_ACCESS_TOKEN,
    },
  };

  return await axios
    .get(url, options)
    .then(async (res): Promise<string> => {
      if (
        res.data.parentId === "undefined" ||
        res.data.parentId === "root" ||
        !res.data.parentId
      ) {
        return res.data.title;
      }

      const parentName = await getProjectRecursive(res.data.parentId);
      return `${parentName}/${res.data.title}`;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
}

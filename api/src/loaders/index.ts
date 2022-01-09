import { Application } from "express";
import expressLoader from "./express";
import mongoLoader from "./mongo";
import schedulerLoader from "./scheduler";
import queueLoader from "./queues";

export default async ({ expressApp }: { expressApp: Application }) => {
  await mongoLoader();
  console.info("MongoDB Initialized");

  const queues = queueLoader();
  console.info("Job queues initialized");

  schedulerLoader(queues);
  console.info("Job scheduler initialized");

  const express = await expressLoader({ app: expressApp });
  console.info("Express Initialized");

  return {
    express,
    queues,
  };
};

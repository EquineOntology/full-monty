import { Application } from "express";
import expressLoader from "./express";
import queueLoader from "./queues";
import schedulerLoader from "./scheduler";

export default async ({ expressApp }: { expressApp: Application }) => {
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

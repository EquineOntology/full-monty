import {
  addOrUpdateTask,
  clearAllTasks,
} from "@/controllers/routing/TaskRouteController";
import CheckApiKey from "@/middleware/CheckApiKey";
import { Router } from "express";
import importRoutes from "./import";

export default (app: Router) => {
  const router = Router();

  app.use("/tasks", router);
  importRoutes(router);

  router.delete("", CheckApiKey, clearAllTasks);

  router.post("/marvin", CheckApiKey, addOrUpdateTask);
};

import {
  clear as clearTasks,
  create as createTask,
} from "@/controllers/TaskController";
import CheckApiKey from "@/middleware/CheckApiKey";
import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import { Router } from "express";
import importRoutes from "./import";

export default (app: Router) => {
  const router = Router();

  app.use("/tasks", router);
  importRoutes(router);

  router.delete("", CheckApiKey, async (req, res) => {
    try {
      await clearTasks();
    } catch (error: any) {
      const responseData = ApiResponseFactory.error(
        "An error occurred processing the deletion request"
      );
      return res.json(responseData).status(500);
    }

    const responseData = ApiResponseFactory.success({
      message: "Data deleted",
    });
    return res.json(responseData).status(200);
  });

  router.post("", CheckApiKey, async (req, res) => {
    if (
      !req.body.id ||
      !req.body.title ||
      !req.body.done ||
      !req.body.category
    ) {
      const responseData = ApiResponseFactory.fail({
        message: `"id", "title", "done", "category" must be provided`,
      });
      return res.json(responseData).status(400);
    }

    let result;
    const { id, title, done, category, duration, time_estimate } = req.body;
    try {
      result = await createTask(
        id,
        title,
        done,
        category,
        duration,
        time_estimate
      );
    } catch (error: any) {
      return res.json(ApiResponseFactory.error(error.message)).status(500);
    }

    return res.json(ApiResponseFactory.success(result)).status(200);
  });
};

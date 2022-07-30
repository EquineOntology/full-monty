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

  router.post("/marvin", CheckApiKey, async (req, res) => {
    let result;
    const { _id, title, done, duration, parentId, timeEstimate } = req.body;

    try {
      result = await createTask(
        _id,
        title,
        "Y", // Amazing Marvin currently returns the wrong value for "done", so for the time being we hardcode "Y" (CF 30.07.22).
        parentId,
        duration / 1000,
        timeEstimate / 1000
      );
    } catch (error: any) {
      return res.json(ApiResponseFactory.error(error.message)).status(500);
    }

    return res.json(ApiResponseFactory.success(result)).status(200);
  });
};

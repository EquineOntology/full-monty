import { Router } from "express";
import importRoutes from "./import";
import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import { clear as clearTasks } from "@/controllers/TaskController";

export default (app: Router) => {
  const router = Router();

  app.use("/tasks", router);
  importRoutes(router);

  router.delete("", async (req, res) => {
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
};

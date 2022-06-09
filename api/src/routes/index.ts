import { Router } from "express";
import estimateRoutes from "./estimate";
import statusRoutes from "./status";
import taskRoutes from "./tasks";

export default () => {
  const app = Router();
  estimateRoutes(app);
  taskRoutes(app);
  statusRoutes(app);

  return app;
};

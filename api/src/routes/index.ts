import { Router } from "express";
import taskRoutes from "./tasks";
import statusRoutes from "./status";
import estimateRoutes from "./estimate";

export default () => {
  const app = Router();
  estimateRoutes(app);
  taskRoutes(app);
  statusRoutes(app);

  return app;
};

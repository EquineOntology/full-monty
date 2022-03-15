import { Router } from "express";
import estimateRoutes from "./estimate";
import taskRoutes from "./tasks";
import statusRoutes from "./status";

export default () => {
  const app = Router();
  estimateRoutes(app);
  taskRoutes(app);
  statusRoutes(app);

  return app;
};

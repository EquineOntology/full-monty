import { Router } from "express";
import estimateRoutes from "./estimate";
import importRoutes from "./import";
import statusRoutes from "./status";

export default () => {
  const app = Router();
  estimateRoutes(app);
  importRoutes(app);
  statusRoutes(app);

  return app;
};

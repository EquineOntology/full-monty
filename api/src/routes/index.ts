import { Router } from "express";
import importRoutes from "./import";
import statusRoutes from "./status";

export default () => {
  const app = Router();
  importRoutes(app);
  statusRoutes(app);

  return app;
};

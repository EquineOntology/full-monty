import { Router } from "express";
import statusRoutes from "./status";

export default () => {
  const app = Router();
  statusRoutes(app);

  return app;
};

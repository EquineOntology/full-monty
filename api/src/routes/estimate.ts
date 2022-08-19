import { getAnalysis } from "@/controllers/routing/EstimateRouteController";
import CheckApiKey from "@/middleware/CheckApiKey";
import { Router } from "express";

export default (app: Router) => {
  const router = Router();

  app.use("/estimate", router);

  router.post("", CheckApiKey, getAnalysis);
};

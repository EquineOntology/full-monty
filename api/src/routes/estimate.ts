import { Router } from "express";
import ApiResponseFactory from "../modules/arch/api/ApiResponseFactory";
import MonteCarloEstimateAnalyzer from "../modules/task_analysis/MonteCarloEstimateAnalyzer";

export default (app: Router) => {
  const router = Router();

  app.use("/estimate", router);

  router.post("", async (req, res) => {
    if (!req.body.estimate) {
      const responseData = ApiResponseFactory.fail({
        message: "An estimate must be provided",
      });
      return res.json(responseData).status(400);
    }

    const estimator = new MonteCarloEstimateAnalyzer();

    let result;
    try {
      result = await estimator.analyze(
        parseInt(req.body.estimate),
        req.body.project ?? null,
        req.body.category ?? null
      );
    } catch (error: any) {
      if (error.name === "InsufficientDataError") {
        const responseData = ApiResponseFactory.fail({
          message: "An estimate could not be calculated due to lack of data",
        });
        return res.json(responseData).status(200);
      }

      return res.json(ApiResponseFactory.error(error.message)).status(500);
    }

    return res.json(ApiResponseFactory.success(result)).status(200);
  });
};

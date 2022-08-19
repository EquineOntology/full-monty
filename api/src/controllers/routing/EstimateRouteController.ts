import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import MonteCarloEstimateAnalyzer from "@/modules/estimate_analysis/MonteCarloEstimateAnalyzer";
import { Request, Response } from "express";

export async function getAnalysis(req: Request, res: Response) {
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
}

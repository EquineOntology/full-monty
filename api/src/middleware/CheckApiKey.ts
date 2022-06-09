import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import { NextFunction, Request, Response } from "express";

export default function CheckApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    const responseData = ApiResponseFactory.fail({
      message: "No API key found",
    });
    return res.status(403).json(responseData);
  }

  if (req.headers.authorization !== process.env.API_KEY) {
    const responseData = ApiResponseFactory.fail({
      message: "Wrong API key supplied",
    });
    return res.status(403).json(responseData);
  }

  next();
}

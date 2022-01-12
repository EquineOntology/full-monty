import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import routes from "../routes";

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes());

  return app;
};

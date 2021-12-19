import compression from "compression";
import express, { Application } from "express";

export default async ({ app }: { app: Application }) => {
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

import Datastore from "@/datastore";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { Server } from "http";
import loaders from "./loaders";

async function startServer() {
  dotenv.config();

  const globals = await loaders({ expressApp: express() });
  const app = globals.express;

  if (!process.env.SENTRY_DSN) {
    console.error("SENTRY_DSN missing in env");
    throw new Error("SENTRY_DSN missing in env");
  }
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 0.1,
  });

  app.use(Sentry.Handlers.requestHandler());

  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Node is listening",
    });
  });

  app.use(Sentry.Handlers.errorHandler());

  const port = process.env.NODE_PORT;
  let server: Server;
  try {
    server = app.listen(port, (): void => {
      console.info(`Connected successfully on port ${port}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }

  process.on("SIGTERM", async () => {
    console.info("SIGTERM received");
    try {
      Datastore.closeConnection();
      server.close(() => {
        process.exit(0);
      });
    } catch (e) {
      server.close(() => {
        process.exit(1);
      });
    }
  });
}

startServer();

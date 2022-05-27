import dotenv from "dotenv";
import { Server } from "http";
import express, { Request, Response } from "express";
import loaders from "./loaders";
import Datastore from "@/datastore";

async function startServer() {
  dotenv.config();

  const globals = await loaders({ expressApp: express() });
  const app = globals.express;

  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Node is listening",
    });
  });

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

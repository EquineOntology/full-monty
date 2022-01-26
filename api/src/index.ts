import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { Server } from "http";
import loaders from "./loaders";
import { close as closeDbConnection } from "./modules/arch/database/MongoConnector";

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
    const closedWithoutError = await closeDbConnection();
    server.close(() => {
      process.exit(closedWithoutError ? 0 : 1);
    });
  });
}

startServer();

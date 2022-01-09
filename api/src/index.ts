import dotenv from "dotenv";
import express, { Request, Response } from "express";
import loaders from "./loaders";

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
  try {
    app.listen(port, (): void => {
      console.info(`Connected successfully on port ${port}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
}

startServer();

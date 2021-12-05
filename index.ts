import compression from "compression";
import express, { Application, Request, Response } from "express";
import TestJob from "./jobs/TestJob";
import Scheduler from "./services/Scheduler";

const app: Application = express();
const port = 9090;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

const scheduler = new Scheduler();
const test = new TestJob();

scheduler.dispatch(test);

import { Router } from "express";

export default (app: Router) => {
  const router = Router();

  app.use("/status", router);

  router.get("", (req, res) => {
    res.json({ status: "ok" }).status(200).end();
  });

  router.head("", (req, res) => {
    res.json({ status: "ok" }).status(200).end();
  });
};

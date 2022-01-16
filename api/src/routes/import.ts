import { Router } from "express";
import multer from "multer";
import { index } from "../modules/queues/JobController";
import MigrateMarvinCsvToMongo from "../modules/queues/jobs/MigrateMarvinCsvToMongo";

export default (app: Router) => {
  const router = Router();

  app.use("/import", router);

  router.get("", async (req, res) => {
    let jobs;
    try {
      jobs = await index();
    } catch (error: any) {
      return res.json({ status: "error", message: error.message }).status(500);
    }

    return res.json({ status: "success", data: jobs }).status(200);
  });

  const upload = multer({ storage: configureMulterStorage() });
  router.post("/marvin", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res
        .json({ status: "fail", message: "No file provided" })
        .status(400);
    }

    const job = new MigrateMarvinCsvToMongo({
      exclusionList: ["LB support"],
      file: req.file.path,
      useEstimateWhenDurationMissing: false,
    });

    job.priority = 1;

    try {
      await job.store();
    } catch (error: any) {
      return res
        .json({ status: "error", message: error.message })
        .status(500);
    }

    return res
      .json({ status: "success", message: "File received" })
      .status(200);
  });
};

function configureMulterStorage() {
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "/var/www/html/temp");
    },
    filename: function (req, file, callback) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + ".csv";
      callback(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
}

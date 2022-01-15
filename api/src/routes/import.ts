import { Router } from "express";
import multer from "multer";
import MigrateMarvinCsvToMongo from "../jobs/MigrateMarvinCsvToMongo";

export default (app: Router) => {
  const router = Router();

  app.use("/import/marvin", router);

  const upload = multer({ storage: configureMulterStorage() });
  router.post("", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res
        .json({ status: "fail", message: "No file provided" })
        .status(400);
    }

    const job = new MigrateMarvinCsvToMongo(req.file.path, {
      exclusionList: ["LB support"],
      useEstimateWhenDurationMissing: false,
    });

    job.priority = 1;
    job.store();

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

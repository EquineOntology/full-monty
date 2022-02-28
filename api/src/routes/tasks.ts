import { Router } from "express";
import multer from "multer";
import { index as getJobList } from "../modules/arch/queues/JobController";
import { clear as clearTasks } from "../modules/task_analysis/data_management/TaskController";
import MigrateMarvinCsvToMongo from "../modules/task_analysis/import/MigrateMarvinCsvToMongo";
import ApiResponseFactory from "../modules/arch/api/ApiResponseFactory";

export default (app: Router) => {
  const router = Router();

  app.use("/tasks", router);

  router.delete("", async (req, res) => {
    try {
      await clearTasks();
    } catch (error: any) {
      const responseData = ApiResponseFactory.error(
        "An error occurred processing the deletion request"
      );
      return res.json(responseData).status(500);
    }

    const responseData = ApiResponseFactory.success({
      message: "Data deleted",
    });
    return res.json(responseData).status(200);
  });

  router.get("/import", async (req, res) => {
    let jobs;
    try {
      jobs = await getJobList();
    } catch (error: any) {
      const responseData = ApiResponseFactory.error(
        "Could not retrieve list of jobs"
      );
      return res.json(responseData).status(500);
    }

    const responseData = ApiResponseFactory.success(jobs);
    return res.json(responseData).status(200);
  });

  const upload = multer({ storage: configureMulterStorage() });
  router.post("/import/marvin", upload.single("file"), async (req, res) => {
    if (!req.file) {
      const responseData = ApiResponseFactory.fail({
        message: "No file provided",
      });

      return res.json(responseData).status(400);
    }

    const job = new MigrateMarvinCsvToMongo({
      exclusionList: ["LB support", "RV support"],
      file: req.file.path,
      useEstimateWhenDurationMissing: false,
    });

    job.priority = 1;

    try {
      await job.store();
    } catch (error: any) {
      const responseData = ApiResponseFactory.error(
        "There was an error dispatching the import job"
      );
      return res.json(responseData).status(500);
    }

    const responseData = ApiResponseFactory.success({
      message: "File received",
    });
    return res.json(responseData).status(200);
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

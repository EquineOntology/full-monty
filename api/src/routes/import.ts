import {
  index as getSettings,
  store as saveSettings,
} from "@/controllers/ImportSettingsController";
import { index as getJobList } from "@/controllers/JobController";
import CheckApiKey from "@/middleware/CheckApiKey";
import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import ImportTasksFromMarvin from "@/modules/queues/jobs/ImportTasksFromMarvin";
import { Router } from "express";
import multer from "multer";

export default (app: Router) => {
  const router = Router();

  app.use("/import", router);

  router.get("/", CheckApiKey, async (req, res) => {
    let jobs;
    try {
      jobs = await getJobList();
    } catch (error) {
      const responseData = ApiResponseFactory.error(
        "Could not retrieve list of jobs"
      );
      return res.status(500).json(responseData);
    }

    const responseData = ApiResponseFactory.success(jobs);
    return res.status(200).json(responseData);
  });

  const upload = multer({ storage: configureMulterStorage() });
  router.post(
    "/marvin",
    CheckApiKey,
    upload.single("file"),
    async (req, res) => {
      if (!req.file) {
        const responseData = ApiResponseFactory.fail({
          message: "No file provided",
        });

        return res.status(400).json(responseData);
      }

      const job = new ImportTasksFromMarvin({ file: req.file.path });
      try {
        await job.save();
      } catch (error) {
        const responseData = ApiResponseFactory.error(
          "There was an error dispatching the import job"
        );
        return res.status(500).json(responseData);
      }

      const responseData = ApiResponseFactory.success({
        message: "File received",
      });
      return res.status(200).json(responseData);
    }
  );

  router.get("/settings", CheckApiKey, async (req, res) => {
    let settings;
    try {
      settings = await getSettings();
    } catch (error) {
      console.error(error);
      const responseData = ApiResponseFactory.error(
        "Could not retrieve settings"
      );
      return res.status(500).json(responseData);
    }

    const responseData = ApiResponseFactory.success(settings);
    return res.status(200).json(responseData);
  });

  router.post("/settings", CheckApiKey, async (req, res) => {
    if (req.body.exclusionList === undefined) {
      const responseData = ApiResponseFactory.fail({
        message: 'field "exclusionList" missing',
      });
      return res.status(400).json(responseData);
    }

    if (req.body.useEstimateWhenDurationMissing === undefined) {
      const responseData = ApiResponseFactory.fail({
        message: 'Field "useEstimateWhenDurationMissing" missing',
      });
      return res.status(400).json(responseData);
    }

    let settingsSaved = false;
    try {
      settingsSaved = await saveSettings({
        exclusionList: req.body.exclusionList.split(","),
        useEstimateWhenDurationMissing: req.body.useEstimateWhenDurationMissing,
      });
    } catch (error) {
      const responseData = ApiResponseFactory.error(
        "There was an error saving settings"
      );
      return res.status(500).json(responseData);
    }
    const responseData = ApiResponseFactory.success(settingsSaved);
    return res.status(200).json(responseData);
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
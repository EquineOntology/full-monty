import {
  index as getSettings,
  store as saveSettings,
} from "@/controllers/ImportSettingsController";
import { index as getJobList } from "@/controllers/JobController";
import ApiResponseFactory from "@/modules/api/ApiResponseFactory";
import ImportTasksFromMarvin from "@/modules/queues/jobs/ImportTasksFromMarvin";
import { Request, Response } from "express";

export async function getImportJobs(req: Request, res: Response) {
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
}

export async function importMarvinData(req: Request, res: Response) {
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

export async function getImportSettings(req: Request, res: Response) {
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
}

export async function updateImportSettings(req: Request, res: Response) {
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
}

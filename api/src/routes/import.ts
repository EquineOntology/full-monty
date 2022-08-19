import {
  getImportJobs,
  getImportSettings,
  importMarvinData,
  updateImportSettings,
} from "@/controllers/routing/ImportRouteController";
import CheckApiKey from "@/middleware/CheckApiKey";
import { Router } from "express";
import multer from "multer";

export default (app: Router) => {
  const router = Router();
  const upload = multer({ storage: configureMulterStorage() });

  app.use("/import", router);

  router.get("/", CheckApiKey, getImportJobs);

  router.post("/marvin", CheckApiKey, upload.single("file"), importMarvinData);

  router.get("/settings", CheckApiKey, getImportSettings);
  router.post("/settings", CheckApiKey, updateImportSettings);
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

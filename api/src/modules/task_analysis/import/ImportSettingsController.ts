import {
  get as getFromDb,
  update as saveInDb,
} from "../../arch/database/MongoConnector";
import { ImportSettings } from "./types";

export async function index() {
  const desiredFields = {
    exclusionList: true,
    useEstimateWhenDurationMissing: true,
  };
  const list = await getFromDb(
    "settings",
    { name: "import" },
    {
      limit: 1,
      fieldFilter: desiredFields,
    }
  );

  return list[0];
}

export async function store(settings: ImportSettings) {
  const result = await saveInDb(
    "settings",
    { name: "import", ...settings },
    true
  );
  return result.acknowledged;
}

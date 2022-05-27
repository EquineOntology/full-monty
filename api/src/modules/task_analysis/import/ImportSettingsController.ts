import Datastore from "@/datastore";
import Setting from "@/models/Setting";
import { ImportSettings } from "./types";

export async function index(): Promise<ImportSettings> {
  const list = await Datastore.get("settings", {
    filter: { id: "import" },
    returnFields: ["data"],
  });

  const defaults = {
    exclusionList: [],
    useEstimateWhenDurationMissing: false,
  };

  if (list.length === 0 || !list[0].data) {
    return defaults;
  }

  let settings = list[0].data;
  if (typeof settings === "string") {
    settings = JSON.parse(settings);
  }

  return {
    exclusionList: settings?.exclusionList ?? defaults.exclusionList,
    useEstimateWhenDurationMissing:
      settings?.useEstimateWhenDurationMissing ??
      defaults.useEstimateWhenDurationMissing,
  };
}

export async function store(settings: ImportSettings) {
  const setting = new Setting("import", settings);
  try {
    await setting.save();
    return true;
  } catch (e) {
    return false;
  }
}

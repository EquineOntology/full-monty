import { clearCollection as clearFromDb } from "../../arch/database/MongoConnector";

export async function clear() {
  const deletionSuccessful = await clearFromDb("marvin_tasks");

  if (!deletionSuccessful) {
    throw new Error("Collection marvin_tasks could not be emptied.");
  }

  return true;
}

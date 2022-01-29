import Model from "../../arch/database/models/Model";
import { Datastore } from "../../arch/database/types";

type MarvinTaskAttributes = {
  taskId: string;
  title: string;
  done: boolean;
  category: string;
  project: string;
  duration: number | null;
  estimate: number | null;
};
export default class MarvinTask extends Model {
  attributes: MarvinTaskAttributes;

  constructor(
    datastore: Datastore,
    id: string,
    title: string,
    done: "Y" | "N",
    category: string,
    duration: number,
    time_estimate: number
  ) {
    super(datastore);
    this.collection = "marvin_tasks";

    const categoryStructure = category.split("/");

    this.attributes = {
      taskId: id,
      title: title,
      done: done === "Y",
      project: categoryStructure[categoryStructure.length - 1],
      category: categoryStructure[0],
      duration: duration > 0 ? duration : null,
      estimate: time_estimate > 0 ? time_estimate : null,
    };
  }
}

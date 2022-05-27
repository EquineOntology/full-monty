import Model from "./Model";
import Datastore from "@/datastore";

export default class Task extends Model {
  table = "tasks";

  id: string;
  title: string;
  done: boolean;
  category: string;
  project: string;
  duration: number | null;
  estimate: number | null;
  original_estimate: number | null;
  ratio: number | null;

  constructor(
    id: string,
    title: string,
    done: "Y" | "N",
    category: string,
    duration: number,
    time_estimate: number,
    ratio: number | null = null
  ) {
    super();

    const categoryStructure = category.split("/");
    const originalEstimateRegex = /.*EST(\d+).*/;
    const matches = title.match(originalEstimateRegex);

    this.id = id;
    (this.title = title), (this.done = done === "Y");
    this.project = categoryStructure[categoryStructure.length - 1];
    this.category = categoryStructure[0];
    this.duration = duration > 0 ? duration : null;
    this.estimate = time_estimate > 0 ? time_estimate : null;
    this.original_estimate = matches ? parseInt(matches[1]) * 60 : null;
    this.ratio = ratio;
  }

  getAttributes() {
    return {
      ...super.getAttributes(),
      title: this.title,
      done: this.done,
      project: this.project,
      category: this.category,
      duration: this.duration,
      estimate: this.estimate,
      original_estimate: this.original_estimate,
      ratio: this.ratio,
    };
  }

  static async clear() {
    await Datastore.clear("tasks");
  }

  static hydrate(attributes: Record<string, any>): Task {
    const task = new Task("", "", "Y", "", 0, 0);
    return Object.assign(task, attributes);
  }
}

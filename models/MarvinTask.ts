import Model from "./Model";

type MarvinTaskAttributes = {
  id: string;
  title: string;
  done: boolean;
  category: string;
  duration: number | null;
  estimate: number | null;
};
export default class MarvinTask extends Model {
  attributes: MarvinTaskAttributes;

  constructor(
    id: string,
    title: string,
    done: "Y" | "N",
    category: string,
    duration: number,
    time_estimate: number
  ) {
    super();
    this.database = "productivity";
    this.collection = "marvin_tasks";

    this.attributes = {
      id: id,
      title: title,
      done: done === "Y",
      category: category,
      duration: duration > 0 ? duration : null,
      estimate: time_estimate > 0 ? time_estimate : null,
    };
  }
}

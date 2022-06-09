import Datastore from "@/datastore";
import Model from "./Model";

export default class Setting extends Model {
  table = "settings";

  id: string;
  data: Record<string, any>;

  constructor(name: string, data: Record<string, any>) {
    super();
    this.id = name;
    this.data = data;
  }

  getAttributes() {
    return {
      ...super.getAttributes(),
      data: this.data,
    };
  }

  static async clear() {
    await Datastore.clear("settings");
  }

  static hydrate(attributes: Record<string, any>): Setting {
    const setting = new Setting("", {});
    return Object.assign(setting, attributes);
  }
}

import { Element } from "@/core/element/element";

export class ChangesBus {
  private readonly changes: Element[] = [];

  constructor() {
    this.changes = [];
  }

  public addChange = (model: Element) => {
    this.changes.push(model);
  };

  public commit = () => {
    // this.changes.forEach((change) => {
    //   change.commit();
    // });
  };
}

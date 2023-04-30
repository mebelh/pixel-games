import { ICords } from "@/core/interfaces";
import { ElementModel } from "./element.model";
import { ElementView } from "./element.view";
import { ICreateElementProps } from "./interfaces";

export class Element {
  private readonly model: ElementModel;
  private readonly view: ElementView;

  constructor(props: ICreateElementProps) {
    this.model = new ElementModel(props);
    this.view = new ElementView(props.canvas);
    this.view.render(this.model);
    if (!props.isNoReactive) this.model.subscribeOnChanges(this.render);
  }

  public subscribeOnChanges: ElementModel["subscribeOnChanges"] = (fn) => {
    return this.model.subscribeOnChanges(fn);
  };

  public render = (element: ElementModel) => {
    this.view.render(element);
  };

  get x(): ElementModel["x"] {
    return this.model.x;
  }

  set x(_) {
    throw new Error("You ned use Element.move(cords)!");
  }

  get y(): ElementModel["y"] {
    return this.model.y;
  }

  set y(_) {
    throw new Error("You ned use Element.move(cords)!");
  }

  get prevX(): ElementModel["prevX"] {
    return this.model.prevX;
  }

  get prevY(): ElementModel["prevY"] {
    return this.model.prevY;
  }

  get stringCords(): ElementModel["stringCords"] {
    return this.model.stringCords;
  }

  set fillColor(fillColor: ElementModel["fillColor"]) {
    this.model.fillColor = fillColor;
  }

  get fillColor(): ElementModel["fillColor"] {
    return this.model.fillColor;
  }

  get id(): ElementModel["id"] {
    return this.model.id;
  }

  // TODO Добавить изменение цвета
  public move = (cords: ICords) => {
    this.model.move(cords);
  };

  destroy(): void {
    this.view.destroy(this.model);
    this.model.destroy();
    this.onDestroy();
  }

  onDestroy(): void {}
}

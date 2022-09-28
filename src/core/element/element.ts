import { ElementModel } from "./element.model";
import { ElementView } from "./element.view";
import { ICreateElementProps } from "./interfaces";

export class Element {
  private readonly model: ElementModel;
  private readonly view: ElementView;

  constructor(props: ICreateElementProps) {
    this.model = new ElementModel(props);
    this.view = new ElementView(props.view, props.container);
    this.view.render(this.model);
    this.model.subscribeOnChanges(this.render);
  }

  subscribeOnChanges: ElementModel["subscribeOnChanges"] = (fn) => {
    return this.model.subscribeOnChanges(fn);
  };

  private readonly render = (element: ElementModel) => {
    this.view.render(element);
  };

  get x(): ElementModel["x"] {
    return this.model.x;
  }

  set x(x: ElementModel["x"]) {
    this.model.x = x;
  }

  get y(): ElementModel["y"] {
    return this.model.y;
  }

  set y(y: ElementModel["y"]) {
    this.model.y = y;
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

  destroy(): void {
    this.view.destroy();
    this.model.destroy();
  }
}

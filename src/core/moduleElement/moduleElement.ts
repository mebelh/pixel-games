import { ICords } from "@/core/interfaces";
import { ModuleElementModel } from "@/core/moduleElement/moduleElement.model";
import { ModuleElementView } from "@/core/moduleElement/moduleElement.view";
import {
  TForEachElementCallback,
  ICreateModuleElementParams,
  ICreateModuleElementSectionParams,
} from "./interfaces";

export class ModuleElement {
  private readonly model: ModuleElementModel;
  private readonly view: ModuleElementView;

  constructor({ canvas, initElements }: ICreateModuleElementParams) {
    this.model = new ModuleElementModel({
      initElements,
    });
    this.view = new ModuleElementView(canvas);
    this.model.subscribeOnChanges(this.render);
    this.model.subscribeOnChanges((model) => {
      model.deletedElements.forEach((el) => {
        this.view.canvas.clearRect(el.x, el.y);
      });
      model.clearDeletedElements();
    });
    this.render();
  }

  private readonly render = () => {
    this.view.render(this.model.elementsList);
  };

  public destroy() {
    this.model.destroy();
    this.onDestroy();
  }

  public addElement = (params: ICreateModuleElementSectionParams) => {
    this.model.addElement(params);
  };

  public forEach(callBack: TForEachElementCallback, isReversed?: boolean) {
    this.model.forEach(callBack, isReversed);
  }

  public get setElementsSync() {
    return this.model.setElementsSync;
  }

  public get id() {
    return this.model.id;
  }

  public get elementsList() {
    return this.model.elementsList;
  }

  public clear = () => {
    this.view.clear(this.elementsList);
    this.model.clear();
  };

  public get move() {
    return this.model.move;
  }

  public get rotate() {
    return this.model.rotate;
  }

  public onDestroy = () => {};

  public get merge() {
    return this.model.merge;
  }

  public get setMapElements() {
    return this.model.setMapElements;
  }

  public get forEachAsync() {
    return this.model.forEachAsync;
  }

  public checkIsHaveElem = (cords: ICords): boolean => {
    return !!this.model.getElement(cords);
  };
}

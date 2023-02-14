import { TBoardSize } from "@/core/board/interfaces";
import { Element } from "@/core/element/element";
import { ElementModel } from "@/core/element/element.model";
import { ICreateElementProps } from "@/core/element/interfaces";
import { IInitGameModelProps } from "@/core/game/interfaces";
import { ICords } from "@/core/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { cordsToString } from "@/core/utils";

export abstract class GameModel {
  readonly boardSize: TBoardSize;
  readonly cellSize: number;

  private readonly moduleElementsIdMap = new Map<string, ModuleElement>();
  private readonly elementsIdMap = new Map<string, Element>();
  private readonly elementsCordMap = new Map<string, Element>();

  protected constructor({ boardSize, cellSize }: IInitGameModelProps) {
    this.boardSize = boardSize;
    this.cellSize = cellSize;
  }

  get boardSizeX() {
    return this.boardSize[0];
  }

  get boardSizeY() {
    return this.boardSize[1];
  }

  public addElement = (createElementParams: ICreateElementProps): Element => {
    const element = new Element(createElementParams);

    const unsubscribe = element.subscribeOnChanges((element) => {
      this.updateElementCords(element);
    });

    element.onDestroy = () => {
      this.destroyElement(element);
      unsubscribe();
    };

    this.elementsIdMap.set(element.id, element);

    this.elementsCordMap.set(
      cordsToString({ x: element.x, y: element.y }),
      element
    );

    return element;
  };

  public updateElementCords = (elementModel: ElementModel): Element => {
    const element = this.elementsCordMap.get(cordsToString(elementModel));
    if (!element) {
      throw new Error(`Element ${elementModel.id} not found`);
    }

    this.elementsCordMap.delete(
      cordsToString({ x: element.prevX, y: element.prevY })
    );
    this.elementsCordMap.set(cordsToString(element), element);

    return element;
  };

  public addModuleElement = (moduleElement: ModuleElement): ModuleElement => {
    this.moduleElementsIdMap.set(moduleElement.id, moduleElement);

    return moduleElement;
  };

  public removeModuleElement = (id: string): void => {
    this.moduleElementsIdMap.delete(id);
  };

  public destroyElement = (cords: ICords) => {
    const element = this.elementsCordMap.get(cordsToString(cords));

    if (!element) {
      throw new Error(`Element ${cordsToString(cords)} not found`);
    }

    this.elementsCordMap.delete(element.stringCords);
    this.elementsIdMap.delete(element.id);
  };
}

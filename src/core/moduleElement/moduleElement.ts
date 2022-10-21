import {
  IElementsMap,
  TChangeElementCordCallback,
  TFilterElementsCallback,
} from "@/core/moduleElement/interfaces";
import { ICreateElementProps } from "@/core/element/interfaces";
import { Element } from "@/core/element/element";
import { cordsToString } from "@/core/utils";
import { View } from "@/core/view";
import { generateId } from "@/games/snakeGame/utils/generateId";

export class ModuleElement {
  elementsMap: IElementsMap;
  private readonly $container: HTMLDivElement;
  readonly id: string;
  readonly view: View;
  readonly cellSize: number;

  constructor(view: View, cellSize: ModuleElement["cellSize"]) {
    this.view = view;
    this.elementsMap = {};
    this.id = generateId();
    this.cellSize = cellSize;
    this.$container = view.createElement("div", ["Object-" + this.id]);
    view.renderElemToRoot(this.$container);
  }

  get elementsList() {
    return Object.values(this.elementsMap);
  }

  get reversedElementsList() {
    const length = this.elementsList.length;
    return this.elementsList.map((_, index, els) => els[length - 1 - index]);
  }

  setElements(changeFn: TChangeElementCordCallback, isReversed?: boolean) {
    const newElementsMap: IElementsMap = {};

    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      (element, index, elements) => {
        const cords = changeFn(element, index, elements);

        element.x = cords.x;
        element.y = cords.y;

        newElementsMap[cordsToString(cords)] = element;
      }
    );

    this.elementsMap = newElementsMap;
  }

  setMapElements(
    filterFn: TFilterElementsCallback,
    changeFn: TChangeElementCordCallback,
    isReversed?: boolean
  ) {
    const newElementsMap: IElementsMap = {};

    (isReversed ? this.reversedElementsList : this.elementsList)
      .filter((...props) => {
        const isResolved = filterFn(...props);
        if (!isResolved) {
          newElementsMap[cordsToString(props[0])] = props[0];
        }
        return isResolved;
      })
      .forEach((element, index, elements) => {
        const cords = changeFn(element, index, elements);

        element.x = cords.x;
        element.y = cords.y;

        newElementsMap[cordsToString(cords)] = element;
      });

    this.elementsMap = {
      ...newElementsMap,
    };
  }

  addElement<T extends typeof Element = typeof Element>(
    props: Omit<ICreateElementProps, "view" | "cellSize">,
    ElementConstructor?: T
  ) {
    const Constructor = ElementConstructor ?? Element;

    const element = new Constructor({
      ...props,
      view: this.view,
      container: this.$container,
      cellSize: this.cellSize,
    });
    if (this.elementsMap[element.stringCords]) {
      throw new Error("Element already exists");
    }
    this.elementsMap[cordsToString(element)] = element;
  }
}

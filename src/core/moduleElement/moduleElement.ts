import {
  IElementsMap,
  TChangeElementCordCallback,
} from "@/core/moduleElement/interfaces";
import { ICreateElementProps } from "@/core/element/interfaces";
import { Element } from "@/core/element/element";
import { cordsToString } from "@/core/utils";
import { View } from "@/core/view";
import { generateId } from "@/games/snakeGame/utils/generateId";

export class ModuleElement {
  readonly elementsMap: IElementsMap;
  private readonly $container: HTMLDivElement;
  readonly id: string;
  private readonly view: View;

  constructor(view: View) {
    this.view = view;
    this.elementsMap = {};
    this.id = generateId();
    this.$container = view.createElement("div", ["snake-" + this.id]);
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
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      (element, index, elements) => {
        const cords = changeFn(element, index, elements);

        element.x = cords.x;
        element.y = cords.y;
      }
    );
  }

  addElement(props: Omit<ICreateElementProps, "view">) {
    const element = new Element({
      ...props,
      view: this.view,
      container: this.$container,
    });
    if (this.elementsMap[element.stringCords]) {
      throw new Error("Element already exists");
    }
    element.subscribeOnChanges((elementModel) => {
      delete this.elementsMap[
        cordsToString({
          x: elementModel.prevX,
          y: elementModel.prevY,
        })
      ];
      this.elementsMap[cordsToString(elementModel)] = element;
    });
    this.elementsMap[cordsToString(element)] = element;
  }
}

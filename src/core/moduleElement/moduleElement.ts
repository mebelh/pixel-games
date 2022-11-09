import {
  IElementsMap,
  TChangeElementCordCallback,
  TChangeElementCordCallbackAsync,
  TFilterElementsCallback,
  TForEachAsyncElementCallback,
  TForEachElementCallback,
} from "@/core/moduleElement/interfaces";
import { ICreateElementProps } from "@/core/element/interfaces";
import { Element } from "@/core/element/element";
import { cordsToString } from "@/core/utils";
import { View } from "@/core/view";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { ICords } from "@/core/interfaces";

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

  getElement(cords: ICords) {
    return this.elementsMap[cordsToString(cords)] || null;
  }

  forEach(callBack: TForEachElementCallback, isReversed?: boolean) {
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      callBack
    );
  }

  forEachAsync(changeFn: TForEachAsyncElementCallback, isReversed?: boolean) {
    const deletedElements: ICords[] = [];
    const newElements: ICords[] = [];

    const deleteElement = (cords: ICords) => {
      deletedElements.push(cords);
    };

    const addElement = (cords: ICords) => {
      newElements.push(cords);
    };

    const elementsList = isReversed
      ? this.reversedElementsList
      : this.elementsList;

    elementsList.forEach((element, index, elements) =>
      changeFn(element, index, elements, addElement, deleteElement)
    );

    deletedElements.forEach((cords) => {
      this.elementsMap[cordsToString(cords)]?.destroy();
    });

    newElements.forEach((cords) => {
      try {
        this.addElement({
          ...cords,
          container: this.$container,
          fillColor: "red",
        });
      } catch (e) {}
    });
  }

  setElementsSync(changeFn: TChangeElementCordCallback, isReversed?: boolean) {
    const newElementsMap: IElementsMap = {};

    this.forEach((element, index, elements) => {
      const cords = changeFn(element, index, elements);

      element.x = cords.x;
      element.y = cords.y;

      newElementsMap[cordsToString(cords)] = element;
    }, isReversed);

    // (isReversed ? this.reversedElementsList : this.elementsList).forEach(
    //   (element, index, elements) => {
    //     const cords = changeFn(element, index, elements);
    //
    //     element.x = cords.x;
    //     element.y = cords.y;
    //
    //     newElementsMap[cordsToString(cords)] = element;
    //   }
    // );

    this.elementsMap = newElementsMap;
  }

  setElementsAsync(
    changeFn: TChangeElementCordCallbackAsync,
    isReversed?: boolean
  ) {
    const newElementsMap: IElementsMap = {};
    const deletedElements: ICords[] = [];
    const newElements: ICords[] = [];

    const deleteElement = (cords: ICords) => {
      deletedElements.push(cords);
    };

    const addElement = (cords: ICords) => {
      newElements.push(cords);
    };

    const elementsList = isReversed
      ? this.reversedElementsList
      : this.elementsList;

    const cordsList = elementsList.map((element, index, elements) =>
      changeFn(element, index, elements, addElement, deleteElement)
    );

    cordsList.forEach((cords, index) => {
      const element = elementsList[index];

      element.x = cords.x;
      element.y = cords.y;

      newElementsMap[cordsToString(cords)] = element;
    });

    deletedElements.forEach((cords) => {
      newElementsMap[cordsToString(cords)].destroy();
    });

    this.elementsMap = newElementsMap;

    newElements.forEach((cords) => {
      this.addElement({
        ...cords,
        fillColor: "red",
      });
    });
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
    if (this.elementsMap[cordsToString(props)]) {
      throw new Error("Element already exists");
    }

    const Constructor = ElementConstructor ?? Element;

    const element = new Constructor({
      ...props,
      view: this.view,
      container: this.$container,
      cellSize: this.cellSize,
    });

    this.elementsMap[cordsToString(element)] = element;

    element.onDestroy = () => {
      this.elementsMap = this.elementsList.reduce(
        (acc, current) => ({
          ...acc,
          ...(current !== element ? { [cordsToString(current)]: current } : {}),
        }),
        {}
      );
    };
  }
}

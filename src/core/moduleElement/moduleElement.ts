import { Canvas } from "@/core/canvas/canvas";
import { Element } from "@/core/element/element";
import { ICreateElementProps } from "@/core/element/interfaces";
import { ICords } from "@/core/interfaces";
import { cordsToString } from "@/core/utils";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { ROTATE_COS, ROTATE_SIN } from "./constants";
import {
  IRotateModuleElementParams,
  TChangeElementCordCallback,
  TChangeElementCordCallbackAsync,
  TFilterElementsCallback,
  TForEachAsyncElementCallback,
  TForEachElementCallback,
  ICreateModuleElementParams,
  EMoveDirection,
  IMoveModuleElementParams,
} from "./interfaces";

export class ModuleElement {
  elementsMap: Map<string, Element>;
  readonly id: string;
  readonly cellSize: number;
  readonly canvas: Canvas;

  constructor({ canvas, cellSize, initElements }: ICreateModuleElementParams) {
    this.elementsMap = new Map();
    this.id = generateId();
    this.cellSize = cellSize;
    this.canvas = canvas;
    initElements?.forEach((params) => this.addElement(params));
  }

  get elementsList(): Element[] {
    return [...this.elementsMap.values()].filter(Boolean);
  }

  get reversedElementsList() {
    return [...this.elementsList].reverse();
  }

  getElement(cords: ICords) {
    return this.elementsMap.get(cordsToString(cords)) ?? null;
  }

  isEmpty = (cords: ICords): boolean => {
    return !this.getElement(cords);
  };

  forEach(callBack: TForEachElementCallback, isReversed?: boolean) {
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      callBack
    );
  }

  // Функция для перебора элементов и применения изменений после
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
      this.elementsMap.get(cordsToString(cords))?.destroy();
      this.elementsMap.delete(cordsToString(cords));
    });

    newElements.forEach((cords) => {
      try {
        this.addElement({
          ...cords,
          fillColor: "red",
        });
      } catch (e) {}
    });
  }

  setElementsSync(changeFn: TChangeElementCordCallback, isReversed?: boolean) {
    this.forEach((element, index, elements) => {
      const cords = changeFn(element, index, elements);
      element.move(cords);
    }, isReversed);
  }

  setElementsAsync(
    changeFn: TChangeElementCordCallbackAsync,
    isReversed?: boolean
  ) {
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

    const newCordsList = elementsList.map((element, index, elements) =>
      changeFn(element, index, elements, addElement, deleteElement)
    );

    newCordsList.forEach((cords, index) => {
      const element = elementsList[index];

      element.move(cords);
    });

    deletedElements.forEach((cords) => {
      this.deleteElement(cords);
    });

    newElements.forEach((cords) => {
      this.addElement({
        ...cords,
        fillColor: "red",
      });
    });
  }

  // Метод изменения элементов, соответствующих условию
  setMapElements(
    filterFn: TFilterElementsCallback,
    changeFn: TChangeElementCordCallback,
    isReversed?: boolean
  ) {
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      (...props) => {
        const areSame = filterFn(...props);

        if (!areSame) {
          return;
        }

        const [element, index, elements] = props;

        const cords = changeFn(element, index, elements);

        element.move(cords);

        this.elementsMap.set(cordsToString(cords), element);
      }
    );
  }

  addElement<T extends typeof Element = typeof Element>(
    props: Omit<ICreateElementProps, "cellSize" | "canvas">,
    ElementConstructor?: T
  ) {
    if (this.elementsMap.get(cordsToString(props))) {
      throw new Error("Element already exists");
    }

    const Constructor = ElementConstructor ?? Element;

    const element = new Constructor({
      ...props,
      cellSize: this.cellSize,
      canvas: this.canvas,
    });

    this.elementsMap.set(cordsToString(element), element);

    const unsubscribe = element.subscribeOnChanges(() => {
      this.elementsMap.delete(
        cordsToString({
          x: element.prevX,
          y: element.prevY,
        })
      );
      this.elementsMap.set(cordsToString(element), element);
    });

    element.onDestroy = () => {
      this.elementsMap.delete(cordsToString(element));
      unsubscribe();
    };
  }

  deleteElement = (cords: ICords) => {
    const element = this.getElement(cords);

    if (!element) {
      throw new Error("Element does not exist");
    }

    element.destroy();
  };

  rotate = ({ degree, centerElement }: IRotateModuleElementParams) => {
    const { x, y } = centerElement;

    this.setMapElements(
      (element) => element !== centerElement,
      (element) => ({
        x:
          (element.x - x) * ROTATE_COS[degree] -
          (element.y - y) * ROTATE_SIN[degree] +
          x,
        y:
          (element.x - x) * ROTATE_SIN[degree] +
          (element.y - y) * ROTATE_COS[degree] +
          y,
      })
    );
  };

  move = ({ direction, delta = 1 }: IMoveModuleElementParams) => {
    switch (direction) {
      case EMoveDirection.U:
        this.setElementsSync(({ x, y }) => ({
          x,
          y: y + delta,
        }));
        break;
      case EMoveDirection.R:
        this.setElementsSync(({ x, y }) => ({
          x: x + delta,
          y,
        }));
        break;
      case EMoveDirection.D:
        this.setElementsSync(({ x, y }) => ({
          x,
          y: y - delta,
        }));
        break;
      case EMoveDirection.L:
        this.setElementsSync(({ x, y }) => ({
          x: x - delta,
          y,
        }));
        break;
    }
  };

  merge = (source: ModuleElement) => {
    source.forEach((element) => {
      this.addElement(element);
    });
    source.destroy();
  };

  destroy = () => {
    this.elementsList.forEach((element) => {
      element.destroy();
    });
    this.onDestroy();
  };

  onDestroy = () => {
    console.warn("Destroy called, but not implemented");
  };
}

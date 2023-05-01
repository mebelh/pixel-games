import { ICords } from "@/core/interfaces";
import { Model } from "@/core/model";
import { ROTATE_COS, ROTATE_SIN } from "@/core/moduleElement/constants";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { ModuleElementSection } from "@/core/moduleElement/moduleElementSection";
import { cordsToString } from "@/core/utils";
import { generateId } from "@/games/snakeGame/utils/generateId";

import {
  EMoveDirection,
  ICreateModuleElementSectionParams,
  IMoveModuleElementParams,
  IRotateModuleElementParams,
  TChangeElementCordCallback,
  TChangeElementCordCallbackAsync,
  TFilterElementsCallback,
  TForEachAsyncElementCallback,
  TForEachElementCallback,
  TInitModuleElementModelParams,
} from "./interfaces";

export class ModuleElementModel extends Model<ModuleElementModel> {
  private elementsMap: Map<string, ModuleElementSection>;
  deletedElements: ModuleElementSection[];
  id: string;

  constructor(params: TInitModuleElementModelParams) {
    super();
    this.elementsMap = new Map();
    this.id = generateId();
    this.deletedElements = [];

    params.initElements?.forEach((createParams) => {
      this.addElement(createParams);
    });

    this.subscribeOnChanges(this.syncCords);
  }

  public clearDeletedElements = () => {
    this.deletedElements = [];
  };

  public syncCords = () => {
    const elementsMap = new Map<string, ModuleElementSection>();

    this.elementsList.forEach((element) => {
      elementsMap.set(cordsToString(element), element);
    });

    this.elementsMap = elementsMap;
  };

  addElement(params: ICreateModuleElementSectionParams) {
    if (this.elementsMap.get(cordsToString(params))) {
      throw new Error("Element already exists");
    }

    const element = new ModuleElementSection(params);

    this.elementsMap.set(cordsToString(element), element);

    element.onDestroy = () => {
      this.deleteElement(element);
    };
  }

  get elementsList() {
    return [...this.elementsMap.values()];
  }

  get reversedElementsList() {
    return [...this.elementsList].reverse();
  }

  getElement(cords: ICords) {
    return this.elementsMap.get(cordsToString(cords)) ?? null;
  }

  checkIsEmptyCell = (cords: ICords): boolean => {
    return !this.getElement(cords);
  };

  forEach(callBack: TForEachElementCallback, isReversed?: boolean) {
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      callBack
    );
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
      element.setCords(cords);
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

    this.emitChange();
  }

  // Функция для перебора элементов и применения изменений после
  forEachAsync = (
    changeFn: TForEachAsyncElementCallback,
    isReversed?: boolean
  ) => {
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
      changeFn({
        element,
        index,
        elements,
        addElement,
        deleteElement,
      })
    );

    deletedElements.forEach((cords) => {
      this.elementsMap.get(cordsToString(cords))?.destroy();
      // this.deleteElement(cords);
    });

    newElements.forEach((cords) => {
      try {
        this.addElement({
          ...cords,
          fillColor: "red",
        });
      } catch (e) {}
    });

    this.emitChange();
  };

  public setElementsSync(
    changeFn: TChangeElementCordCallback,
    isReversed?: boolean
  ) {
    this.forEach((element, index, elements) => {
      const cords = changeFn(element, index, elements);
      element.setCords(cords);
    }, isReversed);
  }

  // Метод изменения элементов, соответствующих условию
  public setMapElements = (
    filterFn: TFilterElementsCallback,
    changeFn: TChangeElementCordCallback,
    isReversed?: boolean
  ) => {
    (isReversed ? this.reversedElementsList : this.elementsList).forEach(
      (...props) => {
        const areSame = filterFn(...props);

        if (!areSame) {
          return;
        }

        const [element] = props;

        const cords = changeFn(...props);

        element.setCords(cords);

        // this.elementsMap.set(cordsToString(cords), element);
      }
    );
    this.emitChange();
  };

  deleteElement = (cords: ICords) => {
    const element = this.getElement(cords);

    if (!element) {
      throw new Error("Element does not exist");
    }

    this.deletedElements.push(element);
    this.elementsMap.delete(cordsToString(element));
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
        this.setElementsAsync(({ x, y }) => ({
          x,
          y: y + delta,
        }));
        break;
      case EMoveDirection.R:
        this.setElementsAsync(({ x, y }) => ({
          x: x + delta,
          y,
        }));
        break;
      case EMoveDirection.D:
        this.setElementsAsync(({ x, y }) => ({
          x,
          y: y - delta,
        }));
        break;
      case EMoveDirection.L:
        this.setElementsAsync(({ x, y }) => ({
          x: x - delta,
          y,
        }));
        break;
    }
  };

  public merge = (source: ModuleElement) => {
    source.forEach((element) => {
      this.addElement(element);
    });
    source.destroy();
  };

  public clear = () => {
    this.elementsList.forEach((element) => {
      element.destroy();
    });
  };

  public destroy = () => {
    this.clear();
    this.onDestroy();
  };

  onDestroy = () => {
    console.warn("onDestroy called, but not implemented");
  };
}

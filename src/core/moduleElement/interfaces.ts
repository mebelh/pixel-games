import { Element } from "@/core/element/element";
import { ICords } from "@/core/interfaces";

export interface IElementsMap {
  [key: string]: Element;
}

export type TForEachElementCallback = (
  element: Element,
  index: number,
  elements: Element[]
) => void;

export type TForEachAsyncElementCallback = (
  element: ICords,
  index: number,
  elements: ICords[],
  addElement: (cords: ICords) => void,
  deleteElement: (cords: ICords) => void
) => void;

export type TChangeElementCordCallback = (
  element: Element,
  index: number,
  elements: Element[]
) => ICords;

export type TChangeElementCordCallbackAsync = (
  element: Element,
  index: number,
  elements: Element[],
  addElement: (cords: ICords) => void,
  deleteElement: (cords: ICords) => void
) => ICords;

export type TFilterElementsCallback = (
  element: Element,
  index: number,
  elements: Element[]
) => boolean;

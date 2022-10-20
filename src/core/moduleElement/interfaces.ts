import { Element } from "@/core/element/element";
import { ICords } from "@/core/interfaces";

export interface IElementsMap {
  [key: string]: Element;
}

export type TChangeElementCordCallback = (
  element: Element,
  index: number,
  elements: Element[]
) => ICords;

export type TFilterElementsCallback = (
  element: Element,
  index: number,
  elements: Element[]
) => boolean;

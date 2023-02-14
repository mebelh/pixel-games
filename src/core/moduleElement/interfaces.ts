import { Element } from "@/core/element/element";
import { ICords } from "@/core/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";

export interface IElementsMap {
  [key: string]: Element | null;
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

export type TRotateDegree = 0 | 90 | 180 | 270;

export type TRotateDegreeMap = {
  [key in TRotateDegree]: number;
};

export interface IRotateModuleElementParams {
  degree: TRotateDegree;
  centerElement: ICords;
}

export enum EMoveDirection {
  U = "U",
  R = "R",
  D = "D",
  L = "L",
}

interface ICreateElementParams {
  x: number;
  y: number;
  fillColor: string;
}

export interface ICreateModuleElementParams {
  initElements?: ICreateElementParams[];
  canvas: ModuleElement["canvas"];
  cellSize: ModuleElement["cellSize"];
}

export interface IMoveModuleElementParams {
  direction: EMoveDirection;
  delta?: number;
}

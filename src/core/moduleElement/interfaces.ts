import { Canvas } from "@/core/canvas/canvas";
import { ICords } from "@/core/interfaces";
import { ModuleElementSection } from "@/core/moduleElement/moduleElementSection";

export type TForEachElementCallback = (
  element: ModuleElementSection,
  index: number,
  elements: ModuleElementSection[]
) => void;

interface IForEachAsyncElementCallbackParams {
  element: ICords;
  index: number;
  elements: ICords[];
  addElement: (cords: ICords) => void;
  deleteElement: (cords: ICords) => void;
}

export type TForEachAsyncElementCallback = (
  params: IForEachAsyncElementCallbackParams
) => void;

export type TChangeElementCordCallback = (
  element: ModuleElementSection,
  index: number,
  elements: ModuleElementSection[]
) => ICords;

export type TChangeElementCordCallbackAsync = (
  element: ModuleElementSection,
  index: number,
  elements: ModuleElementSection[],
  addElement: (cords: ICords) => void,
  deleteElement: (cords: ICords) => void
) => ICords;

export type TFilterElementsCallback = (
  element: ModuleElementSection,
  index: number,
  elements: ModuleElementSection[]
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
  canvas: Canvas;
}

export type TInitModuleElementModelParams = Omit<
  ICreateModuleElementParams,
  "canvas"
>;

export interface IMoveModuleElementParams {
  direction: EMoveDirection;
  delta?: number;
}

export interface ICreateModuleElementSectionParams {
  x: ModuleElementSection["x"];
  y: ModuleElementSection["y"];
  fillColor: ModuleElementSection["fillColor"];
}

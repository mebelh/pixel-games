import { ICreateModuleElementParams } from "@/core/moduleElement/interfaces";

export type TCreateFigureParams = ICreateModuleElementParams & {
  centerElementsIdx: [number, number];
};

export type TCreateAnyFigureParams = Omit<
  ICreateModuleElementParams,
  "initElements"
>;

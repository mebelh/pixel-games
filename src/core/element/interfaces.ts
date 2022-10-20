import { ElementModel } from "src/core/element/element.model";
import { View } from "@/core/view";

export interface ICreateElementProps {
  x: ElementModel["_x"];
  y: ElementModel["_y"];
  fillColor: ElementModel["fillColor"];
  cellSize: ElementModel["cellSize"];
  view: View;
  container?: HTMLDivElement;
}

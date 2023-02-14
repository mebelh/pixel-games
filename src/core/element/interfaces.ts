import { ElementModel } from "@/core/element/element.model";
import { ElementView } from "@/core/element/element.view";

export interface ICreateElementProps {
  x: ElementModel["_x"];
  y: ElementModel["_y"];
  fillColor: ElementModel["fillColor"];
  cellSize: ElementModel["cellSize"];
  canvas: ElementView["canvas"];
}

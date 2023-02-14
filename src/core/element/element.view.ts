import { Canvas } from "@/core/canvas/canvas";
import { ElementModel } from "@/core/element/element.model";

export class ElementView {
  isRendered: boolean;
  canvas: Canvas;

  constructor(canvas: ElementView["canvas"]) {
    this.isRendered = false;
    this.canvas = canvas;
  }

  render(elementModel: ElementModel): void {
    this.canvas.clearRect(elementModel.prevX, elementModel.prevY);
    this.canvas.drawRect(
      elementModel.x,
      elementModel.y,
      elementModel.fillColor
    );
  }

  destroy(elementModel: ElementModel) {
    // TODO
    this.canvas.clearRect(elementModel.x, elementModel.y);
  }
}

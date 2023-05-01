import { Canvas } from "@/core/canvas/canvas";
import { ModuleElementModel } from "@/core/moduleElement/moduleElement.model";

export class ModuleElementView {
  isRendered: boolean;
  canvas: Canvas;

  constructor(canvas: Canvas) {
    this.isRendered = false;
    this.canvas = canvas;
  }

  render(elementsList: ModuleElementModel["elementsList"]): void {
    this.clearPrevPosition(elementsList);
    elementsList.forEach((el) => {
      this.canvas.drawRect(el.x, el.y, el.fillColor);
    });
  }

  clear(elementsList: ModuleElementModel["elementsList"]) {
    elementsList.forEach((el) => {
      this.canvas.clearRect(el.x, el.y);
    });
  }

  clearPrevPosition(elementsList: ModuleElementModel["elementsList"]) {
    elementsList.forEach((el) => {
      this.canvas.clearRect(el.prevX, el.prevY);
    });
  }
}

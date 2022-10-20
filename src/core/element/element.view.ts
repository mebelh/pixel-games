import { View } from "@/core/view";
import { ElementModel } from "@/core/element/element.model";
import { setStyle } from "@/games/snakeGame/utils/setStyle";

export class ElementView {
  $el: HTMLDivElement;
  isRendered: boolean;
  $container?: HTMLDivElement;
  view: View;

  constructor(view: View, $container?: HTMLDivElement) {
    this.view = view;
    this.isRendered = false;
    this.$el = this.view.createElement("div");
    this.$container = $container;
  }

  private getMarginStyle(cellSize: number, margin: number): string {
    return cellSize * margin + "px";
  }

  render(elementModel: ElementModel): void {
    if (!this.isRendered) {
      if (this.$container) {
        this.$container.appendChild(this.$el);
      } else {
        this.view.renderElemToRoot(this.$el);
      }
      this.isRendered = true;
      setStyle(this.$el, {
        position: "absolute",
        width: elementModel.cellSizeStyle,
        height: elementModel.cellSizeStyle,
        transition: "all ease .1s",
      });
    }

    setStyle(this.$el, {
      background: elementModel.fillColor,
      left: this.getMarginStyle(elementModel.cellSize, elementModel.x),
      bottom: this.getMarginStyle(elementModel.cellSize, elementModel.y),
    });
  }

  destroy() {
    this.$el.remove();
  }
}

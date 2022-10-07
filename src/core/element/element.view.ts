import { View } from "@/core/view";
import { ElementModel } from "@/core/element/element.model";

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

  private getStyle(cellSize: number, margin: number): string {
    return cellSize * margin + "px";
  }

  render(element: ElementModel): void {
    if (!this.isRendered) {
      if (this.$container) {
        this.$container.appendChild(this.$el);
      } else {
        this.view.renderElemToRoot(this.$el);
      }
      this.isRendered = true;
      this.$el.style.position = "absolute";
      this.$el.style.width = element.cellSizeStyle;
      this.$el.style.height = element.cellSizeStyle;
    }

    this.$el.style.backgroundColor = element.fillColor;

    this.$el.style.left = this.getStyle(element.cellSize, element.x);
    this.$el.style.bottom = this.getStyle(element.cellSize, element.y);
  }

  destroy() {
    this.$el.remove();
  }
}

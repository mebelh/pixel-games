import { Figure } from "@/games/tetris/figures/figure";
import { TCreateAnyFigureParams } from "@/games/tetris/figures/interfaces";

export class FigureJ extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      centerElementsIdx: [1, 2],
      initElements: [
        {
          x: 5,
          y: 19,
          fillColor: "#666666",
        },
        {
          x: 5,
          y: 18,
          fillColor: "#666666",
        },
        {
          x: 5,
          y: 17,
          fillColor: "#666666",
        },
        {
          x: 4,
          y: 17,
          fillColor: "#666666",
        },
      ],
    });
  }
}

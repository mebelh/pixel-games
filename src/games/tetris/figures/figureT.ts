import { Figure } from "@/games/tetris/figures/figure";
import { TCreateAnyFigureParams } from "@/games/tetris/figures/interfaces";

export class FigureT extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      centerElementsIdx: [1, 2],
      initElements: [
        {
          x: 4,
          y: 19,
          fillColor: "#666699",
        },
        {
          x: 4,
          y: 18,
          fillColor: "#666699",
        },
        {
          x: 4,
          y: 17,
          fillColor: "#666699",
        },
        {
          x: 5,
          y: 18,
          fillColor: "#666699",
        },
      ],
    });
  }
}

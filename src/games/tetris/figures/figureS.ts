import { Figure } from "@/games/tetris/figures/figure";
import { TCreateAnyFigureParams } from "@/games/tetris/figures/interfaces";

export class FigureS extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      centerElementsIdx: [1, 2],
      initElements: [
        {
          x: 4,
          y: 19,
          fillColor: "#66CC66",
        },
        {
          x: 5,
          y: 19,
          fillColor: "#66CC66",
        },
        {
          x: 5,
          y: 18,
          fillColor: "#66CC66",
        },
        {
          x: 6,
          y: 18,
          fillColor: "#66CC66",
        },
      ],
    });
  }
}

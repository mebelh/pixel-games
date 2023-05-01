import { Figure } from "@/games/tetris/figures/figure";
import { TCreateAnyFigureParams } from "@/games/tetris/figures/interfaces";

export class FigureSquare extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      centerElementsIdx: [1, 2],
      initElements: [
        {
          x: 4,
          y: 19,
          fillColor: "#CC9900",
        },
        {
          x: 4,
          y: 18,
          fillColor: "#CC9900",
        },
        {
          x: 5,
          y: 19,
          fillColor: "#CC9900",
        },
        {
          x: 5,
          y: 18,
          fillColor: "#CC9900",
        },
      ],
    });
  }
}

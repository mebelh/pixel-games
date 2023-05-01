import { Figure } from "@/games/tetris/figures/figure";
import { TCreateAnyFigureParams } from "@/games/tetris/figures/interfaces";

export class FigureL extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      centerElementsIdx: [1, 2],
      initElements: [
        {
          x: 4,
          y: 19,
          fillColor: "#CC6699",
        },
        {
          x: 4,
          y: 18,
          fillColor: "#CC6699",
        },
        {
          x: 4,
          y: 17,
          fillColor: "#CC6699",
        },
        {
          x: 5,
          y: 17,
          fillColor: "#CC6699",
        },
      ],
    });
  }
}

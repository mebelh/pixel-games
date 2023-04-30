import { Figure } from "./figure";
import { TCreateAnyFigureParams } from "./interfaces";

export class FigureLine extends Figure {
  constructor(props: TCreateAnyFigureParams) {
    super({
      ...props,
      initElements: [
        {
          x: 3,
          y: 19,
          fillColor: "red",
        },
        {
          x: 4,
          y: 19,
          fillColor: "red",
        },
        {
          x: 5,
          y: 19,
          fillColor: "red",
        },
        {
          x: 6,
          y: 19,
          fillColor: "red",
        },
      ],
      centerElementsIdx: [1, 2],
    });
  }
}

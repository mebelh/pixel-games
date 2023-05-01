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
          fillColor: "#339966",
        },
        {
          x: 4,
          y: 19,
          fillColor: "#339966",
        },
        {
          x: 5,
          y: 19,
          fillColor: "#339966",
        },
        {
          x: 6,
          y: 19,
          fillColor: "#339966",
        },
      ],
      centerElementsIdx: [1, 1],
    });
  }
}

import { Game } from "@/core/game/game";
import { TInitLifeGameProps } from "@/games/life/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { GameModel } from "@/core/game/game.model";
import { LifeGameModel } from "@/games/life/lifeGame.model";
import { getRandomColor } from "@/games/snakeGame/utils/getRandomColor";
import { getRandomNumber } from "@/core/utils";
import { getNeighborsOfPoint } from "@/games/life/utils";
import { ICords } from "@/core/interfaces";

export class LifeGame extends Game<GameModel> {
  elements: ModuleElement;
  fillColor: string;
  isMouseDown: boolean;

  constructor(props: TInitLifeGameProps) {
    super({
      model: new LifeGameModel(props),
    });

    this.elements = new ModuleElement(this.view, this.model.cellSize);
    this.fillColor = getRandomColor();
    this.isMouseDown = false;
  }

  go() {
    this.elements.forEachAsync((element, _, __, addElement, deleteElement) => {
      const elementNeighbours = getNeighborsOfPoint(element);
      const notEmptyNeighbours = elementNeighbours.filter((neighbour) =>
        this.elements.getElement(neighbour)
      );

      if (notEmptyNeighbours.length < 2 || notEmptyNeighbours.length > 3) {
        deleteElement(element);
        return;
      }

      elementNeighbours.forEach((neighbour) => {
        const candidates = getNeighborsOfPoint(neighbour);
        const notEmptyCandidates = candidates.filter((candidate) =>
          this.elements.getElement(candidate)
        );

        const isEmpty = !this.elements.getElement(neighbour);

        if (
          notEmptyCandidates.length === 3 &&
          isEmpty &&
          this.isInsideBoard(neighbour)
        ) {
          addElement({
            ...neighbour,
          });
        }
      });
    });
  }

  isInsideBoard(cords: ICords): boolean {
    return Boolean(
      cords.x >= 0 &&
        cords.y >= 0 &&
        cords.x < this.model.boardSizeX &&
        cords.y < this.model.boardSizeY
    );
  }

  init(initialPointsNumber: number) {
    new Array(initialPointsNumber).fill(0).forEach(() => {
      try {
        this.elements.addElement({
          fillColor: this.fillColor,
          x: getRandomNumber(0, this.model.boardSizeX),
          y: getRandomNumber(0, this.model.boardSizeY),
        });
      } catch (e) {
        console.log(e);
      }
    });

    setInterval(() => {
      this.go();
    }, 500);
  }
}

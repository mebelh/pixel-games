import { ICords } from "@/core/interfaces";
import { Element } from "@/core/element/element";
import { getRandomNumber } from "@/core/utils";
import { SnakeGame } from "@/games/snakeGame/snakeGame";

export class Eat extends Element {
  value: number;
  private readonly snakeGame: SnakeGame;

  constructor(
    snakeGame: SnakeGame,
    value: number,
    initCords: ICords,
    fillColor: string
  ) {
    super({
      view: snakeGame.view,
      ...initCords,
      cellSize: snakeGame.model.cellSize,
      fillColor,
    });
    this.value = value;
    this.snakeGame = snakeGame;

    this.snakeGame.addEat(this);
  }

  rerender() {
    this.x = getRandomNumber(0, this.snakeGame.model.boardSizeX);
    this.y = getRandomNumber(0, this.snakeGame.model.boardSizeY);
  }
}

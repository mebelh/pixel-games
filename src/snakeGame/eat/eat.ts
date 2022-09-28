import { ICords } from "@/core/interfaces";
import { Element } from "@/core/element/element";
import { SnakeGame } from "@/snakeGame";
import { getRandomNumber } from "@/core/utils";

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
      cellSize: snakeGame.cellSize,
      fillColor,
    });
    this.value = value;
    this.snakeGame = snakeGame;

    this.snakeGame.addEat(this);
  }

  rerender() {
    this.x = getRandomNumber(0, this.snakeGame.boardSizeX);
    this.y = getRandomNumber(0, this.snakeGame.boardSizeY);
  }
}

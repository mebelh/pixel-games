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
      ...initCords,
      cellSize: snakeGame.model.cellSize,
      fillColor,
      canvas: snakeGame.canvas,
    });
    this.value = value;
    this.snakeGame = snakeGame;

    this.snakeGame.addEat(this);
  }

  rerender() {
    this.move({
      x: getRandomNumber(0, this.snakeGame.model.boardSizeX),
      y: getRandomNumber(0, this.snakeGame.model.boardSizeY),
    });
  }
}

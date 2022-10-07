import "@/style.scss";
import { CELL_SIZE } from "@/core/constants";
import { SnakeGameInterface } from "@/games/snakeGame/interface";
import { SnakeGame } from "@/games/snakeGame/snakeGame";

export function snakeGame() {
  const snakeGame = new SnakeGame({
    boardSize: [50, 40],
    cellSize: CELL_SIZE,
    eatValue: 1,
    initEatNumber: 30,
  });
  new SnakeGameInterface(snakeGame);
}

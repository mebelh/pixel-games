import "@/style.scss";
import { SnakeGameInterface } from "@/games/snakeGame/interface";
import { SnakeGame } from "@/games/snakeGame/snakeGame";
import { CELL_SIZE } from "@/games/snakeGame/constants";

export function snakeGame() {
  const snakeGame = new SnakeGame({
    boardSize: [400, 400],
    cellSize: CELL_SIZE,
    eatValue: 1,
    initEatNumber: 1000,
  });
  new SnakeGameInterface(snakeGame);
}

import "@/style.scss";
import { SnakeGameInterface } from "@/games/snakeGame/interface";
import { SnakeGame } from "@/games/snakeGame/snakeGame";
import { CELL_SIZE } from "@/games/snakeGame/constants";

export function snakeGame() {
  const snakeGame = new SnakeGame({
    boardSize: [200, 160],
    cellSize: CELL_SIZE,
    eatValue: 1,
    initEatNumber: 800,
  });
  new SnakeGameInterface(snakeGame);
}

import "./style.scss";
import { BoardView } from "@/core/board/board.view";
import { SnakeGame } from "@/snakeGame";
import { CELL_SIZE } from "@/core/constants";
import { SnakeGameInterface } from "@/snakeGame/interface";
import { View } from "@/core/view";

function start() {
  const view = new View();
  const snakeGame = new SnakeGame(view, [40, 40], CELL_SIZE, 20, 1);
  const board = new BoardView(snakeGame, view);
  new SnakeGameInterface(snakeGame);

  board.init();
}

start();

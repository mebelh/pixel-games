import { TankGame } from "@/games/tankGame/tankGame";
import { CELL_SIZE } from "@/games/tankGame/constants";

export function tankGame() {
  const game = new TankGame({
    initStartPayers: 3,
    cellSize: CELL_SIZE,
    boardSize: [50, 40],
  });

  game.init();
}

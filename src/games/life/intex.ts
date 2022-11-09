import { LifeGame } from "@/games/life/lifeGame";

export function lifeGame() {
  const game = new LifeGame({
    boardSize: [100, 100],
    cellSize: 7,
  });

  game.init(600);
}

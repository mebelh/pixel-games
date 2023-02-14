import { LifeGame } from "@/games/life/lifeGame";

export function lifeGame() {
  const game = new LifeGame({
    boardSize: [500, 500],
    cellSize: 7,
  });

  const { toggle } = game.init(100000);

  game.view.onKeydown((code) => {
    if (code === "Space") {
      toggle();
    }
  });
}

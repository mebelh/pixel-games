import { TetrisGame } from "@/games/tetris/tetrisGame";

export const tetrisGame = () => {
  const game = new TetrisGame({
    cellSize: 46,
  });

  game.loop(() => {
    game.model.activeFigure.moveDown();
  }, 5);
};

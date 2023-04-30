import { tankGame } from "@/games/tankGame";
import { snakeGame } from "@/games/snakeGame";
import { lifeGame } from "@/games/life/intex";
import { tetrisGame } from "@/games/tetris";

class Games {
  private readonly snakeGame: typeof snakeGame;
  private readonly tankGame: typeof tankGame;
  private readonly lifeGame: typeof lifeGame;
  private readonly tetrisGame: typeof tetrisGame;

  constructor() {
    this.snakeGame = snakeGame;
    this.tankGame = tankGame;
    this.lifeGame = lifeGame;
    this.tetrisGame = tetrisGame;
  }

  public startSnakeGame() {
    this.snakeGame();
  }

  public startTankGame() {
    this.tankGame();
  }

  public startLifeGame() {
    this.lifeGame();
  }

  public startTetrisGame() {
    this.tetrisGame();
  }
}

const games = new Games();

function boot() {
  games.startTetrisGame();
}

boot();

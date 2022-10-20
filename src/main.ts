import { tankGame } from "@/games/tankGame";
import { snakeGame } from "@/games/snakeGame";

class Games {
  private readonly snakeGame: typeof snakeGame;
  private readonly tankGame: typeof tankGame;

  constructor() {
    this.snakeGame = snakeGame;
    this.tankGame = tankGame;
  }

  startSnakeGame() {
    this.snakeGame();
  }

  startTankGame() {
    this.tankGame();
  }
}

const games = new Games();

function boot() {
  games.startTankGame();
}

boot();

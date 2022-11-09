import { tankGame } from "@/games/tankGame";
import { snakeGame } from "@/games/snakeGame";
import { lifeGame } from "@/games/life/intex";

class Games {
  private readonly snakeGame: typeof snakeGame;
  private readonly tankGame: typeof tankGame;
  private readonly lifeGame: typeof lifeGame;

  constructor() {
    this.snakeGame = snakeGame;
    this.tankGame = tankGame;
    this.lifeGame = lifeGame;
  }

  startSnakeGame() {
    this.snakeGame();
  }

  startTankGame() {
    this.tankGame();
  }

  startLifeGame() {
    this.lifeGame();
  }
}

const games = new Games();

function boot() {
  games.startLifeGame();
}

boot();

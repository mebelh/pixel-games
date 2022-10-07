import { GameModel } from "@/core/game/game.model";
import { Game } from "@/core/game/game";

export interface IInitGameProps {
  boardSize: GameModel["boardSize"];
  cellSize: GameModel["cellSize"];
  model: Game<any>["model"];
}

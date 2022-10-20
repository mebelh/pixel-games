import { GameModel } from "@/core/game/game.model";
import { Game } from "@/core/game/game";

export interface IInitGameProps {
  model: Game<any>["model"];
}

export interface IInitGameModelProps {
  boardSize: GameModel["boardSize"];
  cellSize: GameModel["cellSize"];
}

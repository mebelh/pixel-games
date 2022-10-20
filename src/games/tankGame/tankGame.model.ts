import { GameModel } from "@/core/game/game.model";
import {
  ITanksMap,
  TInitTankGameModelProps,
} from "@/games/tankGame/interfaces";

export class TankGameModel extends GameModel {
  tanksMap: ITanksMap;

  constructor(props: TInitTankGameModelProps) {
    super(props);

    this.tanksMap = {};
  }
}

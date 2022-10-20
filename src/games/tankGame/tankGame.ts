import { Game } from "@/core/game/game";
import { TankGameModel } from "@/games/tankGame/tankGame.model";
import { TInitTankGameProps } from "@/games/tankGame/interfaces";
import { Tank } from "@/games/tankGame/tank/tank";

export class TankGame extends Game<TankGameModel> {
  constructor(props: TInitTankGameProps) {
    super({
      model: new TankGameModel(props),
    });
  }

  addRandomTank() {
    new Tank({ tankGame: this });
  }

  init() {
    this.addRandomTank();
  }
}

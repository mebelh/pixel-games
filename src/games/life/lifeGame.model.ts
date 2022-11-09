import { GameModel } from "@/core/game/game.model";
import { IInitGameModelProps } from "@/core/game/interfaces";

export class LifeGameModel extends GameModel {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IInitGameModelProps) {
    super(props);
  }
}

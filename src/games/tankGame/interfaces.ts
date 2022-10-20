import { IInitGameModelProps } from "@/core/game/interfaces";
import { Tank } from "@/games/tankGame/tank/tank";

export type TDegree = 0 | 90 | 180 | 270;

export type TDegreeMap = {
  [key in TDegree]: number;
};

export type TInitTankGameProps = IInitGameModelProps & {
  initStartPayers: number;
};

export interface ITanksMap {
  [key: string]: Tank;
}

export type TInitTankGameModelProps = IInitGameModelProps;

import { TankGame } from "@/games/tankGame/tankGame";
import { Missile } from "@/games/tankGame/missile/missile";

export interface IInitTankProps {
  tankGame: TankGame;
}

export enum ETankDirection {
  U = "U",
  R = "R",
  D = "D",
  L = "L",
}

export interface IMissilesMap {
  [key: string]: Missile;
}

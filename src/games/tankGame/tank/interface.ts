import { TankGame } from "@/games/tankGame/tankGame";
import { Missile } from "@/games/tankGame/missile/missile";

export interface IInitTankProps {
  tankGame: TankGame;
}

export interface IMissilesMap {
  [key: string]: Missile;
}

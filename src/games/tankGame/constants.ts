import { ETankDirection } from "@/games/tankGame/tank/interface";
import { TDegree, TDegreeMap } from "@/games/tankGame/interfaces";

export const CELL_SIZE = 20;

export const COS: TDegreeMap = {
  0: 1,
  90: 0,
  180: -1,
  270: 0,
};

export const SIN: TDegreeMap = {
  0: 0,
  90: 1,
  180: 0,
  270: -1,
};

export const TANK_GAME_ROTATE_MAP: {
  [key in ETankDirection]: TDegree;
} = {
  [ETankDirection.R]: 270,
  [ETankDirection.L]: 90,
  [ETankDirection.D]: 180,
  [ETankDirection.U]: 0,
};

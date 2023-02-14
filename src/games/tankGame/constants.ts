import { EMoveDirection } from "@/core/moduleElement/interfaces";
import { TDegree, TDegreeMap } from "@/games/tankGame/interfaces";

export const CELL_SIZE = 2;

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
  [key in EMoveDirection]: TDegree;
} = {
  [EMoveDirection.R]: 270,
  [EMoveDirection.L]: 90,
  [EMoveDirection.D]: 180,
  [EMoveDirection.U]: 0,
};

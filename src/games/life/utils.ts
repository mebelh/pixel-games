import { ICords } from "@/core/interfaces";
import { NEIGHBOURS_OF_ZERO_POINT } from "@/games/life/constants";

export function getNeighborsOfPoint(point: ICords): ICords[] {
  return NEIGHBOURS_OF_ZERO_POINT.map(({ x, y }) => ({
    x: point.x + x,
    y: point.y + y,
  }));
}

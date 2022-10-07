import { ICords } from "@/core/interfaces";

export function calcDistance(first: ICords, second: ICords): number {
  return Math.sqrt(
    Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2)
  );
}

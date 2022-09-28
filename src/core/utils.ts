import { ICords } from "./interfaces";

export function cordsToString(cords: ICords) {
  return `${cords?.x}:${cords?.y}`;
}

export function stringToCords(stringCords: string): ICords {
  const [x, y] = stringCords.split(":");

  return {
    x: Number(x),
    y: Number(y),
  };
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

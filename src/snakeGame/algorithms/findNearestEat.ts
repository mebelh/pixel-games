import { ICords } from "@/core/interfaces";
import { SnakeGame } from "@/snakeGame";
import { Eat } from "@/snakeGame/eat/eat";
import { calcDistance } from "@/snakeGame/utils/distance";

function findNearestEat(headCords: ICords, eatList: SnakeGame["eatList"]): Eat {
  return eatList.reduce<{
    minDistance: number;
    res: Eat;
  }>(
    (acc, eat) => {
      const distanceCandidate = calcDistance(headCords, eat);
      const isSuitableCandidate = distanceCandidate < acc.minDistance;
      return {
        minDistance: isSuitableCandidate ? distanceCandidate : acc.minDistance,
        res: isSuitableCandidate ? eat : acc.res,
      };
    },
    {
      res: eatList[0],
      minDistance: Infinity,
    }
  ).res;
}

export default findNearestEat;

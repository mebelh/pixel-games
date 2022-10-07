import { ICords } from "@/core/interfaces";
import { Eat } from "@/games/snakeGame/eat/eat";
import { calcDistance } from "@/games/snakeGame/utils/distance";
import { SnakeGame } from "@/games/snakeGame/snakeGame";

function findNearestEat(
  headCords: ICords,
  eatList: SnakeGame["model"]["eatList"]
): Eat {
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

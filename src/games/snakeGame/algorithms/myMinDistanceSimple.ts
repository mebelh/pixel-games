import { ESnakeDirection } from "@/games/snakeGame/snake/interfaces";
import { TGetDirectionAlgorithm } from "@/games/snakeGame/algorithms/interfaces";
import findNearestEat from "@/games/snakeGame/algorithms/findNearestEat";

const myMinDistanceSimpleAlg: TGetDirectionAlgorithm = (snake) => {
  const { eatList } = snake.snakeGame.model;
  const { head, direction, headNextCords, snakeGame } = snake;

  const nearestEat = findNearestEat(head, eatList);

  const snakeElement = snakeGame.model.getSnakeElement(headNextCords);

  if (snakeElement) {
    if (direction === ESnakeDirection.D || direction === ESnakeDirection.U) {
      return ESnakeDirection.R;
    }
    return ESnakeDirection.D;
  }

  if (nearestEat.x === head.x) {
    if (nearestEat.y < head.y) {
      if (direction === ESnakeDirection.U) {
        return ESnakeDirection.R;
      }
      return ESnakeDirection.D;
    }
    if (direction !== ESnakeDirection.D) {
      return ESnakeDirection.U;
    }
  }

  if (nearestEat.y === head.y) {
    if (nearestEat.x < head.x) {
      if (direction === ESnakeDirection.R) {
        return ESnakeDirection.D;
      }
      return ESnakeDirection.L;
    }
    if (direction !== ESnakeDirection.L) {
      return ESnakeDirection.R;
    }
  }

  return direction;
};

export default myMinDistanceSimpleAlg;

import { Snake } from "@/snakeGame/snake/snake";
import { Eat } from "@/snakeGame/eat/eat";

export interface ISnakeMap {
  [key: string]: Snake;
}

export interface IEatMap {
  [key: string]: Eat;
}

import { Snake } from "@/games/snakeGame/snake/snake";
import { Eat } from "@/games/snakeGame/eat/eat";
import { IInitGameProps } from "@/core/game/interfaces";
import { SnakeGameModel } from "@/games/snakeGame/snakeGame.model";

export interface ISnakeMap {
  [key: string]: Snake;
}

export interface IEatMap {
  [key: string]: Eat;
}

export type TInitSnakeGameModelProps = Omit<IInitGameProps, "model"> & {
  eatValue: SnakeGameModel["eatValue"];
};

export type TInitSnakeGameProps = Omit<IInitGameProps, "model"> &
  TInitSnakeGameModelProps & {
    initEatNumber: number;
  };

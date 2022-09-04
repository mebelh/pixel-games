import { SnakeModel } from '@/core/model/snake/snake.model';

export type TBoardSize = [number, number];

export type TChangeSnakeCallback = (snake: SnakeModel) => void;

export type TChangeSnakeCallbacks = {
  [key: string]: TChangeSnakeCallback[]
}

export type TSnakeId = string | number

export interface ISnakeCell {
  x: number;
  y: number;
  snakeId: string | number;
}

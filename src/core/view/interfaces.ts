import { SnakeView } from '@/core/view/snake/snake.view';
import { Eat } from '@/core/view/eat';

export enum EBoardLineDirection {
  Vertical = 'Vertical',
  Horizontal = 'Horizontal',
}

export enum ESnakeDirection {
  U = 'U',
  R = 'R',
  D = 'D',
  L = 'L'
}

export interface ISnakeMap {
  [key: string]: SnakeView;
}

export interface IEatMap {
  [key: string]: Eat | null;
}

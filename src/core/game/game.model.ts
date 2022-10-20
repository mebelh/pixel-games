import { TBoardSize } from "@/core/board/interfaces";
import { IInitGameModelProps } from "@/core/game/interfaces";

export class GameModel {
  readonly boardSize: TBoardSize;
  readonly cellSize: number;

  constructor({ boardSize, cellSize }: IInitGameModelProps) {
    this.boardSize = boardSize;
    this.cellSize = cellSize;
  }

  get boardSizeX() {
    return this.boardSize[0];
  }

  get boardSizeY() {
    return this.boardSize[1];
  }
}

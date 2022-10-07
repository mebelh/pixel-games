import { TBoardSize } from "@/core/board/interfaces";

export class BoardModel {
  private readonly boardSize: TBoardSize;
  readonly cellSize: number;

  constructor(
    boardSize: BoardModel["boardSize"],
    cellSize: BoardModel["cellSize"]
  ) {
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

import { BoardModel } from "@/core/board/board.model";
import { IInitBoardProps } from "@/core/board/interfaces";
import { Canvas } from "@/core/canvas/canvas";
import { EBoardLineDirection } from "@/core/interfaces";

export class Board {
  private readonly model: BoardModel;
  private readonly canvas: Canvas;

  constructor({ boardSize, cellSize, canvas }: IInitBoardProps) {
    this.model = new BoardModel(boardSize, cellSize);
    this.canvas = canvas;
  }

  private readonly drawBoardLine = (
    direction: EBoardLineDirection,
    margin: number = 0
  ) => {
    const {
      canvas: { drawLine },
    } = this;

    if (direction === EBoardLineDirection.Horizontal) {
      drawLine(
        0,
        margin,
        this.model.boardSizeX * this.model.cellSize,
        margin,
        "#b9b9b9"
      );
    } else {
      drawLine(
        margin,
        0,
        margin,
        this.model.boardSizeY * this.model.cellSize,
        "#b9b9b9"
      );
    }
  };

  private renderBord() {
    for (let x = 0; x < this.model.boardSizeX + 1; x++) {
      this.drawBoardLine(EBoardLineDirection.Vertical, x * this.model.cellSize);
    }

    for (let y = 0; y < this.model.boardSizeY + 1; y++) {
      this.drawBoardLine(
        EBoardLineDirection.Horizontal,
        y * this.model.cellSize
      );
    }
  }

  init() {
    this.renderBord();
  }
}

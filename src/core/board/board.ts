import { View } from "@/core/view";
import { EBoardLineDirection } from "@/core/interfaces";
import { BoardModel } from "@/core/board/board.model";
import { IInitBoardProps } from "@/core/board/interfaces";

export class Board {
  private readonly view: View;
  private readonly model: BoardModel;

  constructor({ boardSize, cellSize, view }: IInitBoardProps) {
    this.view = view;
    this.model = new BoardModel(boardSize, cellSize);
  }

  private setVerticalLineHeightCss(height: string) {
    this.view.setCssVar("--vertical-line-height", height);
  }

  private setHorizontalLineWidthCss(width: string) {
    this.view.setCssVar("--horizontal-line-width", width);
  }

  private setCellSizeCss(size: number) {
    this.view.setCssVar("--cell-size", size + "px");
  }

  private createBoardLine(direction: EBoardLineDirection, margin: number = 0) {
    const elemClassName =
      direction === EBoardLineDirection.Horizontal
        ? "borderHorizontalLine"
        : "borderVerticalLine";

    const $line = this.view.createElement("div", [elemClassName]);

    if (direction === EBoardLineDirection.Horizontal) {
      $line.style.marginTop = margin * this.model.cellSize + "px";
    } else {
      $line.style.marginLeft = margin * this.model.cellSize + "px";
    }

    return $line;
  }

  private renderBord() {
    const board = this.view.createElement("div", ["board"]);

    for (let x = 0; x < this.model.boardSizeX + 1; x++) {
      const line = this.createBoardLine(EBoardLineDirection.Vertical, x);

      board.appendChild(line);
    }

    for (let y = 0; y < this.model.boardSizeY + 1; y++) {
      const line = this.createBoardLine(EBoardLineDirection.Horizontal, y);

      board.appendChild(line);
    }

    this.view.renderElemToRoot(board);
  }

  init() {
    const horizontalLineWidth = this.model.boardSizeX * this.model.cellSize;
    const verticalLineHeight = this.model.boardSizeY * this.model.cellSize;
    this.setVerticalLineHeightCss(verticalLineHeight + 1 + "px");
    this.setHorizontalLineWidthCss(horizontalLineWidth + "px");
    this.view.setCssVar("--game-width", horizontalLineWidth + "px");
    this.view.setCssVar("--game-height", verticalLineHeight + "px");
    this.setCellSizeCss(this.model.cellSize);
    this.renderBord();
  }
}

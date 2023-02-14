import { BoardModel } from "@/core/board/board.model";
import { Canvas } from "@/core/canvas/canvas";

export interface IInitBoardProps {
  boardSize: BoardModel["boardSize"];
  cellSize: BoardModel["cellSize"];
  canvas: Canvas;
}

export type TBoardSize = [number, number];

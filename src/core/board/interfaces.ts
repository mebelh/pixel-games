import { BoardModel } from "@/core/board/board.model";
import { Board } from "@/core/board/board";

export interface IInitBoardProps {
  boardSize: BoardModel["boardSize"];
  cellSize: BoardModel["cellSize"];
  view: Board["view"];
}

export type TBoardSize = [number, number];

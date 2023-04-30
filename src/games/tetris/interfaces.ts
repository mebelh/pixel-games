import { IInitGameModelProps } from "@/core/game/interfaces";
import { FigureL } from "@/games/tetris/figures/figureL";
import { FigureLine } from "@/games/tetris/figures/figureLine";

export type TInitTetrisGameModelProps = Pick<IInitGameModelProps, "cellSize">;

export type TInitTetrisGameProps = Omit<TInitTetrisGameModelProps, "game">;

export type TFigure = FigureLine | FigureL;

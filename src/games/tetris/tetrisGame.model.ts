import { GameModel } from "@/core/game/game.model";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { TFigure, TInitTetrisGameModelProps } from "./interfaces";
import { TETRIS_GAME_BOARD_SIZE } from "./constants";

export class TetrisGameModel extends GameModel {
  private _allBlocks: ModuleElement | null = null;

  private _activeFigure: TFigure | null = null;

  constructor({ cellSize }: TInitTetrisGameModelProps) {
    super({
      boardSize: TETRIS_GAME_BOARD_SIZE,
      cellSize,
    });
  }

  private get allBlocks(): ModuleElement {
    if (!this._allBlocks) {
      throw new Error("All blocks not initialized");
    }
    return this._allBlocks;
  }

  public init = (allBlocks: ModuleElement) => {
    this._allBlocks = allBlocks;
  };

  public restart = () => {
    this.allBlocks.clear();
    this._activeFigure = null;
  };

  public get activeFigure(): TFigure {
    if (!this._activeFigure) {
      throw new Error("Active figure not initialized");
    }
    return this._activeFigure;
  }

  public setActiveFigure = (figure: TFigure) => {
    this._activeFigure = figure;
  };
}

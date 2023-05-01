import { GameModel } from "@/core/game/game.model";
import { EMoveDirection } from "@/core/moduleElement/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { TETRIS_GAME_BOARD_SIZE } from "./constants";
import { TFigure, TInitTetrisGameModelProps } from "./interfaces";

export class TetrisGameModel extends GameModel {
  private _allBlocks: ModuleElement | null = null;

  private _activeFigure: TFigure | null = null;

  constructor({ cellSize }: TInitTetrisGameModelProps) {
    super({
      boardSize: TETRIS_GAME_BOARD_SIZE,
      cellSize,
    });
  }

  get allBlocks(): ModuleElement {
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
    this.activeFigure.clear();
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

  public joinActiveFigure = () => {
    this.allBlocks.merge(this.activeFigure);
    this.checkFullLines();
  };

  public clearLine = (lineNumber: number) => {
    this.allBlocks.forEachAsync(({ element, deleteElement }) => {
      if (element.y === lineNumber) {
        deleteElement(element);
      }
    });
  };

  public checkFullLines = () => {
    const numberOfElemsInLineMap = new Map<number, number>();

    this.allBlocks.forEach((element) => {
      const numberOfElemsInLine = numberOfElemsInLineMap.get(element.y);
      numberOfElemsInLineMap.set(
        element.y,
        numberOfElemsInLine ? numberOfElemsInLine + 1 : 1
      );
    });
    const fullLines = Array.from(numberOfElemsInLineMap.keys()).filter(
      (key) => numberOfElemsInLineMap.get(key) === TETRIS_GAME_BOARD_SIZE[0]
    );

    fullLines.forEach((lineNumber) => {
      this.clearLine(lineNumber);
      console.log(lineNumber);
      this.allBlocks.setMapElements(
        (el) => el.y > lineNumber,
        (element) => {
          console.log(element);
          return {
            x: element.x,
            y: element.y - 1,
          };
        }
      );
    });
  };
}

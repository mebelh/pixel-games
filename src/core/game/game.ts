import { Board } from "@/core/board/board";
import { View } from "@/core/view";
import { GameModel } from "@/core/game/game.model";
import { IInitGameProps } from "@/core/game/interfaces";

export abstract class Game<T extends GameModel> {
  private readonly board: Board;
  readonly view: View;
  model: T;

  protected constructor(props: IInitGameProps) {
    this.view = new View();
    this.model = props.model;
    this.board = new Board({
      view: this.view,
      cellSize: this.model.cellSize,
      boardSize: this.model.boardSize,
    });

    this.board.init();
  }

  init(..._: any[]) {
    throw new Error("init needs to be implemented");
  }
}

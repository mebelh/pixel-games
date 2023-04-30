import { Game } from "@/core/game/game";
import { FigureLine } from "@/games/tetris/figures/figureLine";
import { TetrisGameModel } from "./tetrisGame.model";
import { TFigure, TInitTetrisGameProps } from "./interfaces";

export class TetrisGame extends Game<TetrisGameModel> {
  constructor(props: TInitTetrisGameProps) {
    const model = new TetrisGameModel(props);

    super({
      model,
    });

    const allBlocs = this.createModuleElement();
    model.init(allBlocs);

    this.setControlKeys();
    this.start();
  }

  private readonly setControlKeys = () => {
    this.view.onKeydown((code) => {
      switch (code) {
        case "ArrowLeft":
          console.log("left");
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          console.log("right");
          break;
        case "ArrowDown":
          this.fastDown();
          console.log("down");
          break;
        case "KeyA":
          this.rotateLeft();
          console.log("RotateLeft");
          break;
        case "KeyD":
          this.rotateRight();
          console.log("RotateRight");
          break;
        case "KeyR":
          this.restart();
          break;
      }
    });
  };

  private readonly restart = () => {
    this.model.restart();
    this.start();
  };

  private readonly start = () => {
    this.resetActiveFigure();
  };

  private readonly rotateLeft = () => {
    this.model.activeFigure.rotateLeft();
  };

  private readonly rotateRight = () => {
    this.model.activeFigure.rotateRight();
  };

  private readonly fastDown = () => {};

  private readonly moveLeft = () => {
    this.model.activeFigure.moveLeft();
  };

  private readonly moveRight = () => {
    this.model.activeFigure.moveRight();
  };

  private readonly resetActiveFigure = () => {
    this.model.setActiveFigure(this.createRandomFigure());
  };

  private readonly createRandomFigure = (): TFigure => {
    const randomNumber = Math.random();

    switch (true) {
      case randomNumber >= 0 && randomNumber < 0.25:
        return this.createFigureLine();
      case randomNumber >= 0.25 && randomNumber < 0.5:
        return this.createFigureLine();
      default:
        return this.createFigureLine();
    }
  };

  private readonly createFigureLine = (): FigureLine => {
    return new FigureLine({
      canvas: this.canvas,
      cellSize: this.model.cellSize,
    });
  };
}

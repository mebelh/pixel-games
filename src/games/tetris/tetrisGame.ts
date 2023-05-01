import { Game } from "@/core/game/game";
import { Figure } from "@/games/tetris/figures/figure";
import { FigureJ } from "@/games/tetris/figures/figureJ";
import { FigureL } from "@/games/tetris/figures/figureL";
import { FigureLine } from "@/games/tetris/figures/figureLine";
import { FigureS } from "@/games/tetris/figures/figureS";
import { FigureSquare } from "@/games/tetris/figures/figureSquare";
import { FigureT } from "@/games/tetris/figures/figureT";
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

  private readonly fastDown = () => {
    this.model.activeFigure.moveDown();
  };

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
        return this.createFigure(FigureLine);
      case randomNumber >= 0.2 && randomNumber < 0.35:
        return this.createFigure(FigureL);
      case randomNumber >= 0.35 && randomNumber < 0.5:
        return this.createFigure(FigureJ);
      case randomNumber >= 0.5 && randomNumber < 0.65:
        return this.createFigure(FigureS);
      case randomNumber >= 0.65 && randomNumber < 0.75:
        return this.createFigure(FigureSquare);
      case randomNumber >= 0.75 && randomNumber < 0.9:
        return this.createFigure(FigureT);
      default:
        return this.createFigureLine();
    }
  };

  private readonly checkCanMoveDown = (): boolean => {
    const { activeFigure, allBlocks } = this.model;

    let canMove = true;

    activeFigure.forEach((element) => {
      canMove =
        canMove &&
        !allBlocks.checkIsHaveElem({
          x: element.x,
          y: element.y - 1,
        });
    });

    return canMove;
  };

  private readonly checkCanMoveX = (delta: number): boolean => {
    const { activeFigure, allBlocks } = this.model;

    let canMove = true;

    activeFigure.forEach((element) => {
      canMove =
        canMove &&
        !allBlocks.checkIsHaveElem({
          x: element.x + delta,
          y: element.y,
        });
    });

    return canMove;
  };

  private readonly checkCanMoveLeft = (): boolean => {
    return this.checkCanMoveX(-1);
  };

  private readonly checkCanMoveRight = (): boolean => {
    return this.checkCanMoveX(1);
  };

  private readonly createFigure = <T extends typeof Figure>(Constructor: T) => {
    const figure = new Constructor({
      canvas: this.canvas,
    });

    figure.onJoin = () => {
      this.model.joinActiveFigure();
      this.resetActiveFigure();
      this.checkFullLines();
    };

    figure.checkCanMoveDown = this.checkCanMoveDown;
    figure.checkCanMoveLeft = this.checkCanMoveLeft;
    figure.checkCanMoveRight = this.checkCanMoveRight;

    return figure;
  };

  private readonly createFigureLine = (): FigureLine => {
    const figureLine = new FigureLine({
      canvas: this.canvas,
    });

    figureLine.onJoin = () => {
      this.model.joinActiveFigure();
      this.resetActiveFigure();
      this.checkFullLines();
    };

    figureLine.checkCanMoveDown = this.checkCanMoveDown;
    figureLine.checkCanMoveLeft = this.checkCanMoveLeft;
    figureLine.checkCanMoveRight = this.checkCanMoveRight;

    return figureLine;
  };

  private readonly checkFullLines = () => {
    this.model.checkFullLines();
  };
}

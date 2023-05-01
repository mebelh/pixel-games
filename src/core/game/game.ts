import { Board } from "@/core/board/board";
import { Element } from "@/core/element/element";
import { ICreateElementProps } from "@/core/element/interfaces";
import { ICreateModuleElementParams } from "@/core/moduleElement/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { View } from "@/core/view";
import { GameModel } from "@/core/game/game.model";
import { IInitGameProps } from "@/core/game/interfaces";
import { Canvas } from "../canvas/canvas";

export abstract class Game<T extends GameModel> {
  private readonly board: Board;
  readonly view: View;
  readonly canvas: Canvas;
  model: T;

  protected constructor(props: IInitGameProps) {
    this.view = new View();

    this.model = props.model;

    this.canvas = new Canvas(
      this.view,
      this.model.boardSizeX,
      this.model.boardSizeY,
      this.model.cellSize
    );

    this.board = new Board({
      cellSize: this.model.cellSize,
      boardSize: this.model.boardSize,
      canvas: this.canvas,
    });

    this.board.init();
  }

  public addElement = (props: ICreateElementProps): Element => {
    return this.model.addElement(props);
  };

  loop = (
    cb: () => void,
    fps: number
  ): {
    pause: () => void;
    resume: () => void;
    toggle: () => void;
  } => {
    let last = new Date().getTime();
    let isActive = true;

    const animate = () => {
      requestAnimationFrame(() => {
        if (isActive) {
          animate();
        }
        const curr = new Date().getTime();
        if (curr - last > 1000 / fps) {
          cb();
          last = curr;
        }
      });
    };

    animate();

    const pause = () => {
      isActive = false;
    };
    const resume = () => {
      if (!isActive) {
        isActive = true;
        animate();
      }
    };

    const toggle = () => {
      if (isActive) {
        pause();
      } else {
        resume();
      }
    };

    return {
      pause,
      resume,
      toggle,
    };
  };

  createModuleElement = (
    params: Omit<ICreateModuleElementParams, "canvas" | "cellSize"> = {}
  ): ModuleElement => {
    const moduleElement = new ModuleElement({
      ...params,
      canvas: this.canvas,
    });
    this.model.addModuleElement(moduleElement);

    moduleElement.onDestroy = () => {
      this.model.removeModuleElement(moduleElement.id);
    };

    return moduleElement;
  };

  init(..._: any[]) {
    throw new Error("init needs to be implemented");
  }
}

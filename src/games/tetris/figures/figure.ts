import { ICords } from "@/core/interfaces";
import { EMoveDirection } from "@/core/moduleElement/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { TETRIS_GAME_BOARD_SIZE } from "../constants";
import { TCreateFigureParams } from "./interfaces";

export abstract class Figure extends ModuleElement {
  private readonly centerElementLeft: ICords;
  private readonly centerElementRight: ICords;
  constructor({ centerElementsIdx, ...params }: TCreateFigureParams) {
    super(params);
    const leftElem = this.elementsList[centerElementsIdx[0]];
    const rightElem = this.elementsList[centerElementsIdx[1]];
    this.centerElementLeft = leftElem;
    this.centerElementRight = rightElem;
  }

  public moveLeft = () => {
    const isCantMove = this.elementsList.find((el) => !el.x);

    if (isCantMove) {
      this.throwCantMoveError();
    }

    this.move({
      direction: EMoveDirection.L,
    });
  };

  public moveRight = () => {
    const isCantMove = this.elementsList.find(
      (el) => el.x === TETRIS_GAME_BOARD_SIZE[1]
    );

    if (isCantMove) {
      this.throwCantMoveError();
    }

    this.move({
      direction: EMoveDirection.R,
    });
  };

  public moveDown = () => {
    const isCantMove = this.elementsList.find(
      (el) => el.y === TETRIS_GAME_BOARD_SIZE[0]
    );

    if (isCantMove) {
      this.throwCantMoveError();
    }

    this.move({
      direction: EMoveDirection.D,
    });
  };

  public rotateLeft = () => {
    this.rotate({
      centerElement: {
        x: this.centerElementLeft.x,
        y: this.centerElementRight.y,
      },
      degree: 90,
    });
  };

  public rotateRight = () => {
    this.rotate({
      centerElement: {
        x: this.centerElementLeft.x,
        y: this.centerElementRight.y,
      },
      degree: 270,
    });
  };

  private throwCantMoveError() {
    throw new Error("Cant move!");
  }
}

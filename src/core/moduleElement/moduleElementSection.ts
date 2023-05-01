import { ICords } from "@/core/interfaces";
import {
  EMoveDirection,
  ICreateModuleElementSectionParams,
  IMoveModuleElementParams,
} from "@/core/moduleElement/interfaces";
import { generateId } from "@/games/snakeGame/utils/generateId";

export class ModuleElementSection {
  private _x: number;
  private _y: number;
  private _prevX: number;
  private _prevY: number;
  id: string;
  fillColor: string;

  constructor({ x, y, fillColor }: ICreateModuleElementSectionParams) {
    this._x = x;
    this._y = y;
    this._prevX = NaN;
    this._prevY = NaN;
    this.fillColor = fillColor;
    this.id = generateId();
  }

  destroy() {
    this.onDestroy();
  }

  onDestroy = (): void => {
    throw new Error("On destroy not initialized");
  };

  public get x(): number {
    return this._x;
  }

  public set x(_) {
    throw new Error("Use move to change cords");
  }

  public get y(): number {
    return this._y;
  }

  public set y(_) {
    throw new Error("Use move to change cords");
  }

  public get prevX(): number {
    return this._prevX;
  }

  public get prevY(): number {
    return this._prevY;
  }

  setCords(cords: ICords): void {
    this._prevX = this._x;
    this._prevY = this._y;
    this._x = cords.x;
    this._y = cords.y;
  }

  move = ({ direction, delta = 1 }: IMoveModuleElementParams) => {
    switch (direction) {
      case EMoveDirection.U:
        this.setCords({
          x: this.x,
          y: this.y + delta,
        });
        break;
      case EMoveDirection.R:
        this.setCords({
          x: this.x + delta,
          y: this.y,
        });
        break;
      case EMoveDirection.D:
        this.setCords({
          x: this.x,
          y: this.y - delta,
        });
        break;
      case EMoveDirection.L:
        this.setCords({
          x: this.x - delta,
          y: this.y,
        });
        break;
    }
  };
}

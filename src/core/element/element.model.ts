import { ICreateElementProps } from "@/core/element/interfaces";
import { ICords } from "@/core/interfaces";
import { cordsToString } from "@/core/utils";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { Model } from "@/core/model";

export class ElementModel extends Model<ElementModel> {
  private _x: number;
  private _y: number;
  private _prevX: ElementModel["_x"];
  private _prevY: ElementModel["_y"];
  _fillColor: string;
  readonly cellSize: number;
  id: string;

  constructor({ x, y, fillColor, cellSize }: ICreateElementProps) {
    super();
    this._y = y;
    this._x = x;
    this._prevX = NaN;
    this._prevY = NaN;

    this._fillColor = fillColor;
    this.cellSize = cellSize;
    this.id = generateId();
  }

  get x(): ElementModel["_x"] {
    return this._x;
  }

  get y(): ElementModel["_y"] {
    return this._y;
  }

  get fillColor(): ElementModel["_fillColor"] {
    return this._fillColor;
  }

  set fillColor(fillColor: ElementModel["_fillColor"]) {
    this._fillColor = fillColor;
    this.emitChange();
  }

  get prevX(): ElementModel["_prevX"] {
    return this._prevX;
  }

  get prevY(): ElementModel["_prevY"] {
    return this._prevY;
  }

  get stringCords() {
    return cordsToString(this);
  }

  public readonly move = (cords: ICords) => {
    this._prevX = this._x;
    this._prevY = this._y;
    this._x = cords.x;
    this._y = cords.y;
    this.emitChange();
  };

  get cellSizeStyle(): string {
    return this.cellSize + "px";
  }

  destroy() {}
}

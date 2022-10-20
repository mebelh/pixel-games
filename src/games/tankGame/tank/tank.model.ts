import { ETankDirection } from "@/games/tankGame/tank/interface";
import { Model } from "@/core/model";
import { getRandomColor } from "@/games/snakeGame/utils/getRandomColor";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { Missile } from "@/games/tankGame/missile/missile";

export class TankModel extends Model<TankModel> {
  private _direction: ETankDirection;
  readonly id: string;
  public fillColor: string;
  readonly missilesList: Missile[];
  missileTimeout: ReturnType<typeof setInterval> | number;
  canShot: boolean;

  constructor() {
    super();
    this._direction = ETankDirection.R;
    this.missilesList = [];
    this.fillColor = getRandomColor();
    this.id = generateId();
    this.canShot = true;
    this.missileTimeout = 0;
  }

  get direction(): TankModel["_direction"] {
    return this._direction;
  }

  set direction(direction: TankModel["_direction"]) {
    this._direction = direction;
    this.emitChange();
  }
}

export function getTankModel() {
  return new TankModel();

  // return new Proxy(model, {
  //   set(...props): boolean {
  //     model.onChange(...props);
  //     return true;
  //   },
  // });
}

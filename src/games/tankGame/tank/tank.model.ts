import { ETankDirection } from "@/games/tankGame/tank/interface";
import { Model } from "@/core/model";
import { getRandomColor } from "@/games/snakeGame/utils/getRandomColor";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { Missile } from "@/games/tankGame/missile/missile";
import { makeObservable } from "@/core/observeble/observable";
import { TObservableOn } from "@/core/observeble/interfaces";

export class TankModel extends Model<TankModel> {
  direction: ETankDirection;
  readonly id: string;
  public fillColor: string;
  readonly missilesList: Missile[];
  missileTimeout: ReturnType<typeof setInterval> | number;
  canShot: boolean;
  on: TObservableOn<TankModel>;

  constructor() {
    super();
    this.direction = ETankDirection.R;
    this.missilesList = [];
    this.fillColor = getRandomColor();
    this.id = generateId();
    this.canShot = true;
    this.missileTimeout = 0;

    this.on = makeObservable(this as TankModel);
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

import { EMoveDirection } from "@/core/moduleElement/interfaces";
import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { TObservableOn } from "@/core/observeble/interfaces";
import { makeObservable } from "@/core/observeble/observable";
import { getRandomNumber } from "@/core/utils";
import { COS, SIN, TANK_GAME_ROTATE_MAP } from "@/games/tankGame/constants";
import { Missile } from "@/games/tankGame/missile/missile";
import { IInitTankProps } from "@/games/tankGame/tank/interface";
import { getTankModel, TankModel } from "@/games/tankGame/tank/tank.model";
import { TankGame } from "@/games/tankGame/tankGame";

export class Tank extends ModuleElement {
  model: TankModel;
  private readonly tankGame: TankGame;
  on: TObservableOn<Tank>;

  constructor({ tankGame }: IInitTankProps) {
    super(tankGame.view, tankGame.model.cellSize);
    this.tankGame = tankGame;

    this.model = getTankModel();

    this.on = makeObservable(this as Tank);

    const startPositionX = getRandomNumber(1, tankGame.model.boardSizeX - 1);
    const startPositionY = getRandomNumber(1, tankGame.model.boardSizeY - 1);

    this.addElement({
      x: startPositionX,
      y: startPositionY,
      fillColor: this.model.fillColor,
    });
    this.addElement({
      x: startPositionX,
      y: startPositionY + 1,
      fillColor: this.model.fillColor,
    });
    this.addElement({
      x: startPositionX + 1,
      y: startPositionY,
      fillColor: this.model.fillColor,
    });
    this.addElement({
      x: startPositionX - 1,
      y: startPositionY,
      fillColor: this.model.fillColor,
    });
    this.addElement({
      x: startPositionX - 1,
      y: startPositionY - 1,
      fillColor: this.model.fillColor,
    });
    this.addElement({
      x: startPositionX + 1,
      y: startPositionY - 1,
      fillColor: this.model.fillColor,
    });

    this.syncDirection();

    this.on("elementsMap", () => {
      this.syncDirection();
    });

    tankGame.view.onKeydown((code) => {
      switch (code) {
        case "ArrowLeft":
          this.rotate({
            direction: EMoveDirection.L,
          });
          break;
        case "ArrowRight":
          this.rotate({
            direction: EMoveDirection.R,
          });
          break;
        case "ArrowUp":
          this.go();
          break;
        case "Space":
          this.shot();
          break;
      }
    });
  }

  get centerElement() {
    return this.elementsList[0];
  }

  get gunElement() {
    return this.elementsList[1];
  }

  syncDirection() {
    const {
      centerElement: { x: xCenter, y: yCenter },
      gunElement: { x: xGun, y: yGun },
    } = this;

    if (xGun === xCenter) {
      if (yGun < yCenter) {
        this.model.direction = EMoveDirection.D;
        return;
      }
      this.model.direction = EMoveDirection.U;
      return;
    }

    if (xGun < xCenter) {
      this.model.direction = EMoveDirection.L;
      return;
    }
    this.model.direction = EMoveDirection.R;
  }

  rotate = ({ direction }: Pick<TankModel, "direction">) => {
    const { centerElement } = this;
    const { x, y } = centerElement;

    const degree = TANK_GAME_ROTATE_MAP[direction];

    this.setMapElements(
      (element) => element !== centerElement,
      (element) => ({
        x: (element.x - x) * COS[degree] - (element.y - y) * SIN[degree] + x,
        y: (element.x - x) * SIN[degree] + (element.y - y) * COS[degree] + y,
      })
    );
  };

  shot = () => {
    if (!this.model.canShot) {
      return;
    }

    setTimeout(() => {
      this.model.canShot = true;
    }, 400);

    this.model.canShot = false;

    const { x, y } = this.gunElement;

    const missile = new Missile({
      x,
      y,
      fillColor: "red",
      view: this.view,
      cellSize: this.cellSize,
      direction: this.model.direction,
      boardSize: this.tankGame.model.boardSize,
    });

    this.model.missilesList.push(missile);
  };

  get isCanGo(): boolean {
    return !(
      (!this.gunElement.x && this.model.direction === EMoveDirection.L) ||
      (!this.gunElement.y && this.model.direction === EMoveDirection.D) ||
      (this.gunElement.x === this.tankGame.model.boardSizeX - 1 &&
        this.model.direction === EMoveDirection.R) ||
      (this.gunElement.y === this.tankGame.model.boardSizeY - 1 &&
        this.model.direction === EMoveDirection.U)
    );
  }

  go() {
    if (!this.isCanGo) {
      return;
    }
    this.move({
      direction: this.model.direction,
    });
  }
}

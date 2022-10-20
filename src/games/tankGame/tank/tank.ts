import { ModuleElement } from "@/core/moduleElement/moduleElement";
import {
  ETankDirection,
  IInitTankProps,
} from "@/games/tankGame/tank/interface";
import { getTankModel, TankModel } from "@/games/tankGame/tank/tank.model";
import { getRandomNumber } from "@/core/utils";
import { COS, SIN, TANK_GAME_ROTATE_MAP } from "@/games/tankGame/constants";
import { Missile } from "@/games/tankGame/missile/missile";
import { TankGame } from "@/games/tankGame/tankGame";

export class Tank extends ModuleElement {
  model: TankModel;
  private readonly tankGame: TankGame;

  constructor({ tankGame }: IInitTankProps) {
    super(tankGame.view, tankGame.model.cellSize);
    this.tankGame = tankGame;

    this.model = getTankModel();

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

    tankGame.view.addEventListenerToRoot("keydown", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          this.rotate({
            direction: ETankDirection.L,
          });
          this.syncDirection();
          break;
        case "ArrowRight":
          this.rotate({
            direction: ETankDirection.R,
          });
          this.syncDirection();
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
        this.model.direction = ETankDirection.D;
        return;
      }
      this.model.direction = ETankDirection.U;
      return;
    }

    if (xGun < xCenter) {
      this.model.direction = ETankDirection.L;
      return;
    }
    this.model.direction = ETankDirection.R;
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
      setTimeout(() => {
        this.model.canShot = true;
      }, 100);

      return;
    }

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

  go() {
    switch (this.model.direction) {
      case ETankDirection.U:
        this.setElements(({ x, y }) => ({
          x,
          y: y + 1,
        }));
        break;
      case ETankDirection.R:
        this.setElements(({ x, y }) => ({
          x: x + 1,
          y,
        }));
        break;
      case ETankDirection.D:
        this.setElements(({ x, y }) => ({
          x,
          y: y - 1,
        }));
        break;
      case ETankDirection.L:
        this.setElements(({ x, y }) => ({
          x: x - 1,
          y,
        }));
        break;
    }
  }
}

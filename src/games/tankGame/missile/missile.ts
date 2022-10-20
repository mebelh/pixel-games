import { Element } from "@/core/element/element";
import { ICreateElementProps } from "@/core/element/interfaces";
import { ETankDirection } from "@/games/tankGame/tank/interface";
import { TBoardSize } from "@/core/board/interfaces";

export class Missile extends Element {
  private readonly direction: ETankDirection;
  private interval: ReturnType<typeof setInterval> | number = 0;
  private readonly fps: number = 10;
  boardSize: TBoardSize;

  constructor(
    initProps: ICreateElementProps & {
      direction: ETankDirection;
      boardSize: TBoardSize;
    }
  ) {
    super(initProps);

    this.direction = initProps.direction;
    this.boardSize = initProps.boardSize;

    this.init();
  }

  private go() {
    switch (this.direction) {
      case ETankDirection.U:
        this.y++;
        break;
      case ETankDirection.L:
        this.x--;
        break;
      case ETankDirection.D:
        this.y--;
        break;
      case ETankDirection.R:
        this.x++;
        break;
    }

    if (
      Math.abs(this.x) === this.boardSize[0] ||
      Math.abs(this.y) === this.boardSize[1] ||
      !~this.x ||
      !~this.y
    ) {
      this.destroy();
    }
  }

  private init() {
    this.interval = setInterval(() => {
      this.go();
    }, 1000 / this.fps);
  }

  destroy() {
    super.destroy();

    clearInterval(this.interval);
  }
}

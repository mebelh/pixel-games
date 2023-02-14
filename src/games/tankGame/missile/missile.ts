import { Element } from "@/core/element/element";
import { ICreateElementProps } from "@/core/element/interfaces";
import { TBoardSize } from "@/core/board/interfaces";
import { EMoveDirection } from "@/core/moduleElement/interfaces";

export class Missile extends Element {
  private readonly direction: EMoveDirection;
  private interval: ReturnType<typeof setInterval> | number = 0;
  private readonly fps: number = 10;
  boardSize: TBoardSize;

  constructor(
    initProps: ICreateElementProps & {
      direction: EMoveDirection;
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
      case EMoveDirection.U:
        this.y++;
        break;
      case EMoveDirection.L:
        this.x--;
        break;
      case EMoveDirection.D:
        this.y--;
        break;
      case EMoveDirection.R:
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

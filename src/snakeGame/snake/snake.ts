import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { ICreateElementProps } from "@/core/element/interfaces";
import { ICords } from "@/core/interfaces";
import { ESnakeDirection } from "@/snakeGame/snake/interfaces";
import { SnakeGame } from "@/snakeGame";
import { CELL_SIZE } from "@/core/constants";
import { generateId } from "@/snakeGame/utils/generateId";
import { cordsToString } from "@/core/utils";
import myMinDistanceSimpleAlg from "@/snakeGame/algorithms/myMinDistanceSimple";

export class Snake extends ModuleElement {
  readonly bodyFillColor: string;
  readonly headFillColor: string;
  readonly snakeGame: SnakeGame;
  readonly id: string;
  direction: ESnakeDirection;
  isKilled: boolean = false;
  renderInterval?: ReturnType<typeof setInterval>;

  constructor(
    headFillColor: string,
    bodyFillColor: string,
    snakeGame: Snake["snakeGame"]
  ) {
    super(snakeGame.view);

    this.bodyFillColor = bodyFillColor;
    this.headFillColor = headFillColor;

    this.direction = ESnakeDirection.R;
    this.snakeGame = snakeGame;

    this.id = generateId();

    this.init();
  }

  get head() {
    return this.elementsList[0];
  }

  get tail() {
    return this.elementsList[this.elementsList.length - 1];
  }

  addBodyElement() {
    const tailCords = Object.assign(
      {},
      {
        x: this.tail.x,
        y: this.tail.y,
      }
    );

    this.go();

    this.addElement({
      fillColor: this.bodyFillColor,
      cellSize: this.snakeGame.cellSize,
      ...tailCords,
    });
  }

  addHeadElement(props: Omit<ICreateElementProps, "fillColor" | "view">) {
    this.addElement({
      ...props,
      fillColor: this.headFillColor,
    });
  }

  setDirection(direction: Snake["direction"]) {
    this.direction = direction;
  }

  get headNextCords(): ICords {
    switch (this.direction) {
      case ESnakeDirection.R:
        return {
          x: (this.head.x + 1) % this.snakeGame.boardSizeX,
          y: this.head.y,
        };
      case ESnakeDirection.D:
        return {
          x: this.head.x,
          y:
            (!this.head.y ? this.snakeGame.boardSizeY - 1 : this.head.y - 1) %
            this.snakeGame.boardSizeY,
        };
      case ESnakeDirection.L:
        return {
          x: !this.head.x ? this.snakeGame.boardSizeX - 1 : this.head.x - 1,
          y: this.head.y,
        };
      case ESnakeDirection.U:
        return {
          x: this.head.x,

          y: (this.head.y + 1) % this.snakeGame.boardSizeY,
        };
    }
  }

  go() {
    const snakeElement = this.snakeGame.getSnakeElement(this.headNextCords);

    if (snakeElement && this.head.id !== snakeElement.id) {
      this.kill();
    }

    this.setElements((_, index, elements) => {
      if (!index) {
        return this.headNextCords;
      }

      return {
        x: elements[index - 1].prevX,
        y: elements[index - 1].prevY,
      };
    });

    try {
      const eat = this.snakeGame.getEat(cordsToString(this.head));

      eat.rerender();

      this.addBodyElement();
    } catch (e) {}
  }

  kill() {
    this.isKilled = true;

    clearInterval(this.renderInterval);

    this.elementsList.forEach((element) => {
      element.fillColor = "red";
    });
  }

  init(
    startPosition: ICords = {
      x: 0,
      y: 0,
    }
  ) {
    this.addHeadElement({
      ...startPosition,
      cellSize: CELL_SIZE,
    });
    this.addBodyElement();
    this.addBodyElement();

    this.renderInterval = setInterval(() => {
      const direction = myMinDistanceSimpleAlg(this);
      this.setDirection(direction);
      this.go();
    }, 100);
  }
}

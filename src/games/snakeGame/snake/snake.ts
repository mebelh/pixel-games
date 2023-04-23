import { ModuleElement } from "@/core/moduleElement/moduleElement";
import { ICreateElementProps } from "@/core/element/interfaces";
import { ICords } from "@/core/interfaces";
import { ESnakeDirection } from "@/games/snakeGame/snake/interfaces";
import { generateId } from "@/games/snakeGame/utils/generateId";
import { cordsToString, getRandomNumber } from "@/core/utils";
import myMinDistanceSimpleAlg from "@/games/snakeGame/algorithms/myMinDistanceSimple";
import { SnakeGame } from "@/games/snakeGame/snakeGame";

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
    super({
      cellSize: snakeGame.model.cellSize,
      canvas: snakeGame.canvas,
    });

    this.bodyFillColor = bodyFillColor;
    this.headFillColor = headFillColor;

    this.direction = ESnakeDirection.R;
    this.snakeGame = snakeGame;

    this.id = generateId();

    this.init({
      x: getRandomNumber(0, this.snakeGame.model.boardSizeX),
      y: getRandomNumber(0, this.snakeGame.model.boardSizeY),
    });
  }

  get head() {
    return this.elementsList[0];
  }

  get tail() {
    return this.elementsList[this.elementsList.length - 1];
  }

  addSnakeElement(props: Omit<ICreateElementProps, "cellSize" | "canvas">) {
    this.addElement(props);
  }

  addBodyElement() {
    const tailCords: ICords = {
      x: this.tail.x,
      y: this.tail.y,
    };

    this.go();

    this.addElement({
      fillColor: this.bodyFillColor,
      ...tailCords,
    });
  }

  addHeadElement(
    props: Omit<
      ICreateElementProps,
      "fillColor" | "view" | "cellSize" | "canvas"
    >
  ) {
    this.addSnakeElement({
      fillColor: this.headFillColor,
      ...props,
    });
  }

  setDirection(direction: Snake["direction"]) {
    this.direction = direction;
  }

  get headNextCords(): ICords {
    switch (this.direction) {
      case ESnakeDirection.R:
        return {
          x: (this.head.x + 1) % this.snakeGame.model.boardSizeX,
          y: this.head.y,
        };
      case ESnakeDirection.D:
        return {
          x: this.head.x,
          y: !this.head.y
            ? this.snakeGame.model.boardSizeY - 1
            : this.head.y - 1,
        };
      case ESnakeDirection.L:
        return {
          x: !this.head.x
            ? this.snakeGame.model.boardSizeX - 1
            : this.head.x - 1,
          y: this.head.y,
        };
      case ESnakeDirection.U:
        return {
          x: this.head.x,
          y: (this.head.y + 1) % this.snakeGame.model.boardSizeY,
        };
    }
  }

  go = () => {
    if (this.isKilled) {
      return;
    }

    const snakeElement = this.snakeGame.model.getSnakeElement(
      this.headNextCords
    );

    if (snakeElement && this.head.id !== snakeElement.id) {
      this.kill();
    }

    this.setElementsSync((_, index, elements) => {
      if (!index) {
        return this.headNextCords;
      }

      return {
        x: elements[index - 1].prevX,
        y: elements[index - 1].prevY,
      };
    });

    try {
      const eat = this.snakeGame.model.getEat(cordsToString(this.head));
      eat.rerender();
      this.addBodyElement();
    } catch (e) {}
  };

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
    });
    this.addBodyElement();

    this.addBodyElement();

    // this.renderInterval = setInterval(() => {
    //   const direction = myMinDistanceSimpleAlg(this);
    //   this.setDirection(direction);
    //   this.go();
    // }, 30);

    let last = new Date().getTime();

    const animate = () => {
      requestAnimationFrame(() => {
        if (this.isKilled) {
          return;
        }
        animate();
        const curr = new Date().getTime();
        if (curr - last > 100) {
          const direction = myMinDistanceSimpleAlg(this);
          this.setDirection(direction);
          this.go();
          last = curr;
        }
      });
    };

    animate();
  }
}

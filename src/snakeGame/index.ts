import { TBoardSize } from "@/model/interfaces";
import { Snake } from "@/snakeGame/snake/snake";
import { getRandomColor } from "@/snakeGame/utils/getRandomColor";
import { IEatMap, ISnakeMap } from "@/snakeGame/interfaces";
import { Eat } from "@/snakeGame/eat/eat";
import { cordsToString, getRandomNumber } from "@/core/utils";
import { ICords } from "@/core/interfaces";
import { IElementsMap } from "@/core/moduleElement/interfaces";
import { View } from "@/core/view";

export class SnakeGame {
  private readonly snakeMap: ISnakeMap;
  private readonly eatMap: IEatMap;
  eatValue: number;
  boardSize: TBoardSize;
  cellSize: number;
  eatColor: string;
  view: View;

  constructor(
    view: SnakeGame["view"],
    boardSize: TBoardSize,
    cellSize: SnakeGame["cellSize"],
    initEatNumber: number,
    eatValue: SnakeGame["eatValue"]
  ) {
    this.view = view;
    this.boardSize = boardSize;
    this.snakeMap = {};
    this.cellSize = cellSize;
    this.eatMap = {};
    this.eatValue = eatValue;
    this.eatColor = getRandomColor();

    this.renderEat(initEatNumber);
    this.addRandomSnake();
  }

  addRandomSnake() {
    const snake = new Snake(getRandomColor(), getRandomColor(), this);

    this.addSnake(snake);
  }

  addEat(eat: Eat) {
    this.eatMap[cordsToString(eat)] = eat;

    eat.subscribeOnChanges((eatModel) => {
      delete this.eatMap[
        cordsToString({
          x: eatModel.prevX,
          y: eatModel.prevY,
        })
      ];

      this.eatMap[cordsToString(eat)] = eat;
    });
  }

  getSnakeElement(cords: ICords) {
    return this.snakeElements[cordsToString(cords)];
  }

  get snakeElements() {
    return Object.values(this.snakeMap).reduce<IElementsMap>(
      (acc, snake) => ({
        ...snake.elementsMap,
        ...acc,
      }),
      {}
    );
  }

  renderEat(eatNumber: number) {
    for (let i = 0; i < eatNumber; i++) {
      const eat = new Eat(
        this,
        this.eatValue,
        {
          x: getRandomNumber(0, this.boardSizeX),
          y: getRandomNumber(0, this.boardSizeY),
        },
        this.eatColor
      );

      this.addEat(eat);
    }
  }

  getEat(eatId: string): Eat {
    const eat = this.eatMap[eatId];

    if (!eat) {
      throw new Error("Eat not found");
    }
    return eat;
  }

  generateEat() {}

  addSnake(snake: Snake) {
    this.snakeMap[snake.id] = snake;
  }

  get boardSizeX() {
    return this.boardSize[0];
  }

  get boardSizeY() {
    return this.boardSize[1];
  }

  get snakeList(): Snake[] {
    return Object.values(this.snakeMap);
  }

  get eatList(): Eat[] {
    return Object.values(this.eatMap);
  }
}

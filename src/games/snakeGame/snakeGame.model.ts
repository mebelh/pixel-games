import { GameModel } from "@/core/game/game.model";
import {
  IEatMap,
  ISnakeMap,
  TInitSnakeGameModelProps,
} from "@/games/snakeGame/interfaces";
import { getRandomColor } from "@/games/snakeGame/utils/getRandomColor";
import { Eat } from "@/games/snakeGame/eat/eat";
import { Snake } from "@/games/snakeGame/snake/snake";
import { cordsToString } from "@/core/utils";
import { ICords } from "@/core/interfaces";

export class SnakeGameModel extends GameModel {
  private readonly snakeMap: ISnakeMap;
  private readonly eatMap: IEatMap;
  eatValue: number;
  eatColor: string;

  constructor(props: TInitSnakeGameModelProps) {
    super(props);

    this.snakeMap = {};
    this.eatMap = {};
    this.eatValue = props.eatValue;
    this.eatColor = getRandomColor();
  }

  getSnakeElement(cords: ICords) {
    return Object.values(this.snakeMap).find((snake) => {
      return snake.elementsList.find(
        (el) => el.x === cords.x && el.y === cords.y
      );
    });
  }

  setEat(eat: Eat) {
    this.eatMap[cordsToString(eat)] = eat;
  }

  deleteEat(key: string) {
    delete this.eatMap[key];
  }

  setSnake(snake: Snake) {
    this.snakeMap[snake.id] = snake;
  }

  deleteSnake(key: string) {
    delete this.snakeMap[key];
  }

  getEat(eatId: string): Eat {
    const eat = this.eatMap[eatId];

    if (!eat) {
      throw new Error("Eat not found");
    }
    return eat;
  }

  get eatList(): Eat[] {
    return Object.values(this.eatMap);
  }
}

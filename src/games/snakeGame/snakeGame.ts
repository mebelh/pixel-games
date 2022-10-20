import { Snake } from "@/games/snakeGame/snake/snake";
import { getRandomColor } from "@/games/snakeGame/utils/getRandomColor";
import { TInitSnakeGameProps } from "@/games/snakeGame/interfaces";
import { Eat } from "@/games/snakeGame/eat/eat";
import { cordsToString, getRandomNumber } from "@/core/utils";
import { Game } from "@/core/game/game";
import { SnakeGameModel } from "@/games/snakeGame/snakeGame.model";

export class SnakeGame extends Game<SnakeGameModel> {
  constructor({ initEatNumber, ...initModelProps }: TInitSnakeGameProps) {
    super({
      model: new SnakeGameModel(initModelProps),
    });
    this.renderEat(initEatNumber);
    this.addRandomSnake();
  }

  addRandomSnake() {
    const snake = new Snake(getRandomColor(), getRandomColor(), this);

    this.model.setSnake(snake);
  }

  addEat(eat: Eat) {
    this.model.setEat(eat);

    eat.subscribeOnChanges((eatModel) => {
      this.model.deleteEat(
        cordsToString({
          x: eatModel.prevX,
          y: eatModel.prevY,
        })
      );
      this.model.setEat(eat);
    });
  }

  renderEat(eatNumber: number) {
    for (let i = 0; i < eatNumber; i++) {
      const eat = new Eat(
        this,
        this.model.eatValue,
        {
          x: getRandomNumber(0, this.model.boardSizeX),
          y: getRandomNumber(0, this.model.boardSizeY),
        },
        this.model.eatColor
      );

      this.addEat(eat);
    }
  }
}

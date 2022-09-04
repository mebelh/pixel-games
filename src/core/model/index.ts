import {
  TBoardSize,
  TSnakeId,
} from '@/core/model/interfaces';
import { IEatMap, ISnakeMap } from '@/core/view/interfaces';
import { View } from '@/core/view';
import { SnakeView } from '@/core/view/snake/snake.view';
import { EatView } from '@/core/view/eat/eat.view';

export class Model {
  snakeMap: ISnakeMap;
  eatMap: IEatMap;
  boardSize: TBoardSize;
  thisView?: View;
  cellSize: number;

  constructor(boardSize: TBoardSize, initSnakeCords: ISnakeMap = {}, cellSize: Model['cellSize']) {
    this.boardSize = boardSize;
    this.snakeMap = initSnakeCords
    this.eatMap= {}
    this.snakeMap = {}
    this.cellSize = cellSize
  }

  private get snakeList(): SnakeView[] {
    return Object.values(this.snakeMap)
  }

  private get view(): View {
    if(!this.thisView) {
      throw new Error('View does not exist!')
    }

    return this.thisView
  }

  private get eat() {
    return Object.values(this.eatMap)
  }

  getSnake = (id: TSnakeId): SnakeView => {
    return this.snakeMap[id]
  }

  addRandomSnake = () => {
    const snake = new SnakeView(this.view, this)
    snake.init()

    this.setSnake(snake)
  }

  setSnake = (snake: SnakeView) => {
    const snakeId = snake.id
    this.snakeMap[snakeId] = snake
  }

  renderAllSnakes = () => {
    this.snakeList.forEach(snake => {
      snake.renderSnake()
    })
  }

  renderEat = () => {
    Object.values(this.eatMap).forEach(eat => {
      eat?.render()
    })
  }

  generateEat = () => {
    const eat = new EatView(this.boardSize, this.view, this)

    this.eatMap[eat.stringCords] = eat

    this.renderEat()
  }

  init = ( view: View, fps: number = 1) => {
    this.thisView = view
    this.addRandomSnake()
    this.generateEat()
    this.generateEat()
    this.generateEat()
    this.generateEat()
    this.generateEat()
    this.generateEat()

    setInterval(() => {
      this.snakeList.forEach(snake => {
        snake.go()
      })
    }, 1000 / fps )
  }
}

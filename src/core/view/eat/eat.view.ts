import { View } from '@/core/view';
import { Model } from '@/core/model';
import { cordsToString } from '@/core/utils';
import { TBoardSize } from '@/core/model/interfaces';

export class EatView {
  x: number = 0;
  y: number = 0;
  lvl: number;
  private readonly view: View;
  private readonly model: Model
  private readonly $elem: HTMLDivElement;
  private isRendered: boolean;
  private readonly maxSizeX: number;
  private readonly maxSizeY: number;

  constructor(boardSize: TBoardSize, view: View, model: Model, lvl: number = 1) {
    const [maxSizeX, maxSizeY] = boardSize;
    this.maxSizeY = maxSizeY;
    this.maxSizeX = maxSizeX;
    this.lvl = lvl;
    this.model = model
    this.view = view;
    this.$elem = this.createEatElement();
    this.isRendered = false;
    this.setCords()
  }

  private getRandomCord(max: number): number {
    return Math.floor(Math.random() * max)
  }

  private setCords() {
    this.x = this.getRandomCord(this.maxSizeX);
    this.y = this.getRandomCord(this.maxSizeY);
  }

  private createEatElement = () => {
    return this.view.createElement('div', ['eat'])
  }

  get stringCords() {
    return `${this.x}:${this.y}`
  }


  render = () => {
    if(!this.isRendered) {
      this.isRendered = true;
      this.view.renderElemToRoot(this.$elem)
    }

    this.$elem.style.marginLeft = this.x * this.view.cellSize + 'px'
    this.$elem.style.marginTop = this.y * this.view.cellSize + 'px'
  }

  update = () => {
    const cords = cordsToString(this)
    console.log(cords)

    this.setCords()

    const newCords = cordsToString(this)
    console.log(newCords)
    this.model.eatMap[cords] = null
    this.model.eatMap[newCords] = this

    this.render()
  }
}

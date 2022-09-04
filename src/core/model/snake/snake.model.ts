import { ISnakeCell, TChangeSnakeCallback, TSnakeId } from '@/core/model/interfaces';
import { ESnakeDirection } from '@/core/view/interfaces';
import { Model } from '@/core/model';

class SnakeCellModel {
  snakeId: TSnakeId
  x: number;
  y: number;
  killed: boolean;
  isRendered: boolean;
  model: Model;

  constructor(cell: ISnakeCell, model: Model) {
    this.x = cell.x
    this.y = cell.y
    this.snakeId = cell.snakeId
    this.killed = false
    this.isRendered = false
    this.model = model
  }

  get xStyle() {
    return this.x * this.model.cellSize + 'px'
  }

  get yStyle() {
    return this.y * this.model.cellSize + 'px'
  }

}

export class SnakeModel {
  cells: SnakeCellModel[];
  id: TSnakeId;
  direction: ESnakeDirection;
  killed: boolean;
  changeSnakeSubscribers: TChangeSnakeCallback[]

  constructor() {
    this.id = Math.random().toString()
    this.cells = []
    this.direction = ESnakeDirection.R
    this.killed = false
    this.changeSnakeSubscribers = []
  }


  addCell = (initCords?: Omit<ISnakeCell, 'snakeId'>) => {
    const lastCell = this.cells[this.cells.length - 1]

    const cell = new SnakeCellModel({
      snakeId: this.id,
      x: lastCell?.x || initCords?.x || 0,
      y: lastCell?.y || initCords?.y || 0
    })

    this.cells.push(cell)
  }

  move = (x: SnakeViewCell['x'], y: SnakeViewCell['y']) => {
    this.x = x;
    this.y = y
    this.render()
  }

  render = () => {
    this.setCellStyle(this.$cell)

    if(!this.isRendered) {
      this.view.renderElemToRoot(this.$cell)
      this.isRendered = true
    }
  }

  setDirection(direction: ESnakeDirection) {
    this.direction = direction
  }

  subscribeOnChanges(callback: TChangeSnakeCallback): () => void {
    this.changeSnakeSubscribers.push(callback)

    return () => {
      const callbackIdx = this.changeSnakeSubscribers.findIndex(cb => cb === callback)

      this.changeSnakeSubscribers.splice(callbackIdx + 1, 1)
    }
  }

  emitChange() {
    this.changeSnakeSubscribers.forEach(callback => callback(this))
  }

  setCells(valueOrSetterFn: SnakeModel['cells'] | (<T extends SnakeModel['cells']>(cell: T) => T)) {

  }


  clearSnake() {

  }

  kill() {
    if(this.killed) {
      console.warn('SnakeView already killed!')
    }

    this.cells.forEach(cell => {
      cell.kill()
    })
    this.killed = true
  }


  init() {
    this.addCell({
      x: 0,
      y: 0
    })
    this.addCell()
    this.addCell()
    this.addCell()

    this.view.addEventListenerToRoot('keydown',(e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.setDirection(ESnakeDirection.R)
          break
        case 'ArrowDown':
          this.setDirection(ESnakeDirection.D)
          break
        case 'ArrowLeft':
          this.setDirection(ESnakeDirection.L)
          break
        case 'ArrowUp':
          this.setDirection(ESnakeDirection.U)
          break
      }
    })

  }

}

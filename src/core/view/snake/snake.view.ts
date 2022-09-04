import { View } from '@/core/view';
import { SnakeModel } from '@/core/model/snake/snake.model';

class SnakeViewCell {
  $cell: HTMLDivElement;
  view: View;

  constructor(view: View) {
    this.view = view
    this.$cell = this.createCell()
  }

  createCell = () => {
    const $cell = this.view.createElement('div', ['snakeCell'])
    this.setCellStyle($cell)
    return $cell
  }

  setCellStyle = ($cell: SnakeCell['$cell']) => {
    $cell.style.marginLeft = this.xStyle
    $cell.style.marginTop = this.yStyle
  }



  kill = () => {
    if(this.killed) {
      console.warn('SnakeView cell already killed!')
      return
    }

    this.killed = true
    this.$cell.classList.add('killed')
  }


  removeDOM = () => {
    this.$cell.remove()
  }
}

export class SnakeView {
  view: View
  snakeModel: SnakeModel
  cells: SnakeViewCell[]

  constructor(view: View, snakeModel: SnakeModel) {
    this.view = view
    this.snakeModel = snakeModel
    this.cells = []
  }

  renderSnake() {
    this.snakeModel.cells.forEach(cell => {
      cell.render()
    })
  }

}

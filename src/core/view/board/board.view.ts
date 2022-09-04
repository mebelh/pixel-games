import { View } from '@/core/view';
import { EBoardLineDirection } from '@/core/view/interfaces';

export class BoardView {
  private view: View

  constructor(view: View) {
    this.view = view
  }

  createBoardLine(direction: EBoardLineDirection, margin: number = 0 ) {
    const elemClassName = direction === EBoardLineDirection.Horizontal ? 'borderHorizontalLine' : 'borderVerticalLine'

    const $line = this.view.createElement('div', [elemClassName])

    if(direction === EBoardLineDirection.Horizontal) {
      $line.style.marginTop = (margin + 1) * this.view.cellSize + 'px'
    } else {
      $line.style.marginLeft = (margin + 1) * this.view.cellSize + 'px'
    }

    return $line
  }


  renderBord() {
    const board = this.view.createElement('div', ['board'])

    for (let x = 0; x < this.view.boardSizeX; x++) {
      const line = this.createBoardLine(EBoardLineDirection.Vertical, x)

      board.appendChild(line)
    }

    for (let y = 0; y < this.view.boardSizeY; y++) {
      const line = this.createBoardLine(EBoardLineDirection.Horizontal, y)

      board.appendChild(line)
    }

    this.view.renderElemToRoot(board)
  }

}

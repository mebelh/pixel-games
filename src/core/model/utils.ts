import { SnakeView } from '@/core/view/snake/snake.view';
import { ESnakeDirection } from '@/core/view/interfaces';
import { TBoardSize } from '@/core/model/interfaces';
import { Model } from '@/core/model/index';
import { cordsToString } from '@/core/utils';

export function moveSnake( snake: SnakeView, boardSize: TBoardSize, model: Model) {
  const [boardSizeX, boardSizeY] = boardSize

  const [snakeHead] = snake.cells

  const direction = snake.direction

  const reversedSnakeCells = [...snake.cells].reverse()

  reversedSnakeCells.forEach((cell, index) => {
    const nextCell = reversedSnakeCells[index + 1]
    if(nextCell) {
      cell.move(nextCell.x, nextCell.y)
    }
  })

  const eatCords = cordsToString(snakeHead)

  const eat = model.eatMap[eatCords]

  switch (direction) {
    case ESnakeDirection.R:
      snakeHead?.move(((snakeHead.x + 1) % boardSizeX), snakeHead.y)
      break
    case ESnakeDirection.D:
      snakeHead?.move(snakeHead.x, (snakeHead.y + 1)  % boardSizeY)
      break
    case ESnakeDirection.L:
      snakeHead?.move(!snakeHead.x ? boardSizeX - 1 : snakeHead.x - 1, snakeHead.y)
      break
    case ESnakeDirection.U:
      snakeHead?.move(snakeHead.x, (!snakeHead.y ? boardSizeY - 1 : snakeHead.y - 1) % boardSizeY)
      break
  }

  if(eat){
    snake.addCell()

    eat.update()
  }

}

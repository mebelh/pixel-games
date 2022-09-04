import { View } from '../view';
import { Model } from '../model';
import { TBoardSize } from '../model/interfaces';
import { ISnakeMap } from '../view/interfaces';

export class Controller {
  view: View
  model: Model
  fps: number

  constructor(boardSize: TBoardSize, initSnakeCords: ISnakeMap, fps: number) {
    this.fps = fps
    this.model = new Model(boardSize, initSnakeCords);
    this.view = new View()
  }

  init = () => {
    this.model.init(this.view, this.fps)
    this.view.init(this.model)

  }
}

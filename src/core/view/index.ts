import { Model } from '@/core/model';
import { BoardView } from '@/core/view/board/board.view';
import { CELL_SIZE, DARK_THEME_KEY } from '@/core/view/constants';

export class View {
  private readonly $root: HTMLDivElement;
  private model?: Model;
  readonly cellSize: number;
  board: BoardView;
  boardSizeX: number;
  boardSizeY: number;
  private boardSizeXString: string;
  private boardSizeYString: string;

  constructor() {
    const root = this.getElement<HTMLDivElement>('app')
    if(!(root instanceof HTMLDivElement)) {
      throw new Error(`Can't find root element!`)
    }

    this.board = new BoardView(this)
    this.$root = root;
    this.cellSize = CELL_SIZE;
    this.boardSizeX = 0;
    this.boardSizeY = 0;
    this.boardSizeXString = '';
    this.boardSizeYString = '';
  }

  init(model: Model) {
    this.model = model;
    this.boardSizeX = this.model.boardSize[0]
    this.boardSizeY = this.model.boardSize[1]
    this.boardSizeXString = this.boardSizeX * this.cellSize + 'px'
    this.boardSizeYString = this.boardSizeY * this.cellSize + 1 + 'px'
    this.setHorizontalLineWidthCss(this.boardSizeXString);
    this.setVerticalLineHeightCss(this.boardSizeYString);
    this.setCellSizeCss(this.cellSize)

    this.board?.renderBord()

    this.addEventListenerToRoot('keydown', (e) => {
      console.log(e.key)
    })
  }

  getElement<T extends HTMLElement>(id: string): T {
    const elemById = document.getElementById(id) as T
    if(elemById) {
      return elemById
    }

    const elemByQuery = document.querySelector(id) as T

    if(elemByQuery) {
      return elemByQuery
    }

    throw new Error('Can not find element')
  }

  createElement<T extends keyof HTMLElementTagNameMap>(tagName: T, classList?: string[]): HTMLElementTagNameMap[T] {
    const element = document.createElement(tagName) as HTMLElementTagNameMap[T]

    if(classList) {
      element.className = classList.join(' ')
    }

    return element
  }

  addEventListenerToRoot<T extends keyof HTMLElementEventMap>(eventKey: T, callback: (ev: HTMLElementEventMap[T]) => void) {
    document.addEventListener(eventKey, callback)
}

  renderElemToRoot<T extends HTMLElement>(elem: T) {
    this.$root.appendChild(elem)
  }

  setCssVar(key: string, value: string) {
    this.$root.style.setProperty(key, value)
  }

  setVerticalLineHeightCss(height: string) {
    this.setCssVar('--vertical-line-height', height)
  }

  setHorizontalLineWidthCss(width: string) {
    this.setCssVar('--horizontal-line-width', width)
  }

  setCellSizeCss(size: number) {
    this.setCssVar('--cell-size', size + 'px')
  }

  toggleTheme() {
    this.$root.classList.toggle(DARK_THEME_KEY)
  }
}

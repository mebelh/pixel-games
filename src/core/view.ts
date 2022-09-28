import { CELL_SIZE, DARK_THEME_KEY } from "@/core/constants";

export class View {
  private readonly $root: HTMLDivElement;
  readonly cellSize: number;

  constructor() {
    const root = this.getElement<HTMLDivElement>("app");
    if (!(root instanceof HTMLDivElement)) {
      throw new Error(`Can't find root element!`);
    }

    this.$root = root;
    this.cellSize = CELL_SIZE;
  }

  getElement<T extends HTMLElement>(id: string): T {
    const elemById = document.getElementById(id) as T;
    if (elemById) {
      return elemById;
    }

    const elemByQuery = document.querySelector(id) as T;

    if (elemByQuery) {
      return elemByQuery;
    }

    throw new Error("Can not find element");
  }

  createElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    classList?: string[]
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tagName);

    if (classList) {
      element.className = classList.join(" ");
    }

    return element;
  }

  addEventListenerToRoot<T extends keyof HTMLElementEventMap>(
    eventKey: T,
    callback: (ev: HTMLElementEventMap[T]) => void
  ) {
    document.addEventListener(eventKey, callback);
  }

  renderElemToRoot<T extends HTMLElement>(elem: T) {
    this.$root.appendChild(elem);
  }

  setCssVar(key: string, value: string) {
    this.$root.style.setProperty(key, value);
  }

  toggleTheme() {
    this.$root.classList.toggle(DARK_THEME_KEY);
  }
}

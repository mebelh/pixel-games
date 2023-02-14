export class View {
  private readonly $root: HTMLDivElement;
  private readonly keyDownListeners: Array<(code: string) => void>;

  constructor() {
    const root = this.getElement<HTMLDivElement>("app");
    if (!(root instanceof HTMLDivElement)) {
      throw new Error(`Can't find root element!`);
    }

    this.$root = root;
    this.keyDownListeners = [];

    this.addEventListenerToRoot("keydown", (e) => {
      e.preventDefault();
      this.emitKeydownEvent(e.code);
    });
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

  private addEventListenerToRoot<T extends keyof HTMLElementEventMap>(
    eventKey: T,
    callback: (ev: HTMLElementEventMap[T]) => void
  ) {
    document.addEventListener(eventKey, callback);
  }

  private emitKeydownEvent(code: string) {
    this.keyDownListeners.forEach((listener) => listener(code));
  }

  onKeydown = (cb: (code: string) => void) => {
    this.keyDownListeners.push(cb);
  };

  renderElemToRoot<T extends HTMLElement>(elem: T) {
    this.$root.appendChild(elem);
  }
}

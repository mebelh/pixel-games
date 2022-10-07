import { setStyle } from "@/games/snakeGame/utils/setStyle";
import { View } from "@/core/view";
import { SnakeGame } from "@/games/snakeGame/snakeGame";

export class SnakeGameInterface {
  $addSnakeBtn: HTMLButtonElement;
  $interface: HTMLDivElement;
  snakeGame: SnakeGame;
  view: View;

  constructor(snakeGame: SnakeGameInterface["snakeGame"]) {
    this.view = snakeGame.view;
    this.snakeGame = snakeGame;
    this.$interface = this.createInterface();
    this.$addSnakeBtn = this.createAddSnakeButton();

    this.$interface.appendChild(this.$addSnakeBtn);

    this.view.renderElemToRoot(this.$interface);
  }

  createInterface(): HTMLDivElement {
    const $interface = this.view.createElement("div");

    setStyle($interface, {
      position: "fixed",
      right: "0",
      top: "0",
      width: "200px",
      height: "300px",
      backgroundColor: "#eee",
    });

    return $interface;
  }

  createAddSnakeButton(): HTMLButtonElement {
    const $button = this.view.createElement("button");

    setStyle($button, {
      position: "absolute",
      top: "10px",
      left: "10px",
    });

    $button.innerHTML = "Add snake";

    $button.addEventListener("click", () => this.snakeGame.addRandomSnake());

    return $button;
  }
}

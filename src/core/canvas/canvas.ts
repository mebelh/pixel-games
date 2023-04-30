import { View } from "../view";

const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Cant get context!");
  }

  return ctx;
};

export class Canvas {
  private readonly view: View;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly cellSize: number;

  // w, h - ширина холста в пикселях, ширина пикселя может меняться
  readonly width: number;
  readonly height: number;

  // TODO Вынести cellSize
  // w, h - ширина холста в пикселях, ширина пикселя может меняться
  constructor(view: View, w: number, h: number, cellSize: number = 10) {
    this.view = view;
    this.cellSize = cellSize;
    const canvas = this.view.createElement("canvas");
    this.width = w;
    this.height = h;
    canvas.width = w * cellSize + 2;
    canvas.height = h * cellSize + 2;
    this.view.renderElemToRoot(canvas);
    this.ctx = getContext(canvas);
  }

  clearRect = (x: number, y: number) => {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      x * this.cellSize + 2,
      Math.abs(y * this.cellSize - this.height * this.cellSize - 2) -
        this.cellSize,
      this.cellSize - 2,
      this.cellSize - 2
    );
  };

  drawRect = (x: number, y: number, color?: string) => {
    this.ctx.fillStyle = color ?? "black";
    this.ctx.fillRect(
      x * this.cellSize + 2,
      Math.abs(y * this.cellSize - this.height * this.cellSize - 2) -
        this.cellSize,
      this.cellSize - 2,
      this.cellSize - 2
    );
  };

  drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color?: string
  ) => {
    this.ctx.strokeStyle = `${color ?? ""}`;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x1 + 1, y1 + 1);
    this.ctx.lineTo(x2 + 1, y2 + 1);
    this.ctx.stroke();
    this.ctx.closePath();
  };

  clear = () => {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.width * this.cellSize,
      this.height * this.cellSize
    );
  };
}

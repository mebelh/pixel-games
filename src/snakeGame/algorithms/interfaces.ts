import { Snake } from "@/snakeGame/snake/snake";
import { ESnakeDirection } from "@/snakeGame/snake/interfaces";

export type TGetDirectionAlgorithm = (snake: Snake) => ESnakeDirection;

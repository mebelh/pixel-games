import { Snake } from "@/games/snakeGame/snake/snake";
import { ESnakeDirection } from "@/games/snakeGame/snake/interfaces";

export type TGetDirectionAlgorithm = (snake: Snake) => ESnakeDirection;

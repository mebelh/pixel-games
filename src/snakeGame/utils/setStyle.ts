import { objectKeys } from "@/snakeGame/utils/objectKeys";

export function setStyle(
  $el: HTMLElement,
  style: Partial<Omit<CSSStyleDeclaration, "length" | "parentRule">>
): void {
  objectKeys(style).forEach((key) => {
    // @ts-expect-error
    $el.style[key] = style[key];
  });
}

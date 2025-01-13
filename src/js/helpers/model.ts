/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AosElement {
  animated?: boolean;
  options: {
    mirror: boolean;
    once: boolean;
    animatedClassNames: string[];
    id?: string;
  };
  position: {
    in: number;
    out: number;
  };
  node: HTMLElement;

  data?: Record<string, unknown>;
}

export interface AosSettings {
  root?: Window & typeof globalThis;
  offset?: number;
  delay?: number;
  easing?: string;
  duration?: number;
  disable?: boolean | string | (() => boolean);
  once?: boolean;
  mirror?: boolean;
  anchorPlacement?: string;
  startEvent?: string;
  animatedClassName?: string;
  animatedClassNames?: string[];
  initClassName?: string;
  useClassNames?: boolean;
  disableMutationObserver?: boolean;
  throttleDelay?: number;
  debounceDelay?: number;
}

export interface GetInlineOptionParams {
  el: Element;
  key: string;
  fallback: boolean;
}

export interface Offset {
  top: number;
  left: number;
}

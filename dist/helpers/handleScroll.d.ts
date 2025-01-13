import type { AosElement } from './model';
/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @return {void}
 */
export declare const handleScroll: ($elements: AosElement[]) => void;
export declare const handleScrollWithRoot: ($elements: AosElement[], root?: Window & typeof globalThis) => void;
export default handleScroll;

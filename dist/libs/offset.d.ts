import type { Offset } from '../helpers/model';
/**
 * Get offset of DOM element
 * like there were no transforms applied on it
 *
 * @param  {Node} el [DOM element]
 * @return {Object} [top and left offset]
 */
declare const offset: (el: HTMLElement) => Offset;
/**
 * Get offset of DOM element
 * like there were no transforms applied on it
 *
 * @param  {Node} el [DOM element]
 * @param  {Element} target [DOM element]
 * @return {Object} [top and left offset]
 */
export declare function offsetIn(el: HTMLElement, target: HTMLElement): Offset;
export default offset;

/**
 * Calculate offset
 * basing on element's settings like:
 * - anchor
 * - offset
 *
 * @param  {Node} el [Dom element]
 * @return {Integer} [Final offset that will be used to trigger animation in good position]
 */
import type { AosSettings } from './model';
export declare const getPositionIn: (el: HTMLElement, options: AosSettings) => number;
export declare const getPositionOut: (el: HTMLElement, options: AosSettings) => number;

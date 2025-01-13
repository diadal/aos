/**
 * *******************************************************
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 * *******************************************************
 */
import '../sass/aos.scss';
import type { AosElement, AosSettings } from './helpers/model';
/**
 * Export Public API
 */
declare const AOS: {
    init: (settings?: AosSettings) => void | AosElement[];
    refresh: (initialize?: unknown) => void;
    refreshHard: () => void;
};
export default AOS;

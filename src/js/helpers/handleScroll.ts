import detect from './detector';
import type { AosElement } from './model';

interface ndx {
  classList: {
    add: (className: string) => void;
    remove: (className: string) => void;
  };
}
/**
 * Adds multiple classes on node
 * @param {DOMNode} node
 * @param {array}  classes
 */
const addClasses = (node: ndx, classes: string[]) =>
  classes &&
  classes.forEach((className: string) => node.classList.add(className));

/**
 * Removes multiple classes from node
 * @param {DOMNode} node
 * @param {array}  classes
 */
const removeClasses = (node: ndx, classes: string[]) =>
  classes &&
  classes.forEach((className: string) => node.classList.remove(className));

const fireEvent = (eventName: string, data:HTMLElement) => {
  let customEvent;

  if (detect.ie11()) {
    customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventName, true, true, { detail: data });
  } else {
    customEvent = new CustomEvent(eventName, {
      detail: data,
    });
  }

  return document.dispatchEvent(customEvent);
};

/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 */
const applyClasses = (el: AosElement, top: number) => {
  const { options, position, node } = el;

  const hide = () => {
    if (!el.animated) return;

    removeClasses(node, options.animatedClassNames);
    fireEvent('aos:out', node);

    if (el.options.id) {
      fireEvent(`aos:in:${el.options.id}`, node);
    }

    el.animated = false;
  };

  const show = () => {
    if (el.animated) return;

    addClasses(node, options.animatedClassNames);

    fireEvent('aos:in', node);
    if (el.options.id) {
      fireEvent(`aos:in:${el.options.id}`, node);
    }

    el.animated = true;
  };

  if (options.mirror && top >= position.out && !options.once) {
    hide();
  } else if (top >= position.in) {
    show();
  } else if (el.animated && !options.once) {
    hide();
  }
};

/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @return {void}
 */
export const handleScroll = ($elements: AosElement[]): void =>
  $elements.forEach((el) =>
    applyClasses(el, window.scrollY || window.pageYOffset),
  );

export const handleScrollWithRoot = (
  $elements: AosElement[],
  root = window,
) => {
  const scrollTop = window.scrollY || window.pageYOffset || root.screenTop;
  $elements.forEach((el) => applyClasses(el, scrollTop));
};

export default handleScroll;

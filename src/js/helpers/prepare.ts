/* eslint-disable @typescript-eslint/no-explicit-any */
/* Clearing variables */
import { getPositionIn, getPositionOut } from './offsetCalculator';
import getInlineOption from './getInlineOption';
import type { AosElement, AosSettings } from './model';

const prepare = function ($elements: AosElement[], options: AosSettings) {
  $elements.forEach((el) => {
    const mirror = <boolean>getInlineOption(el.node, 'mirror', options.mirror);
    const once = <boolean>getInlineOption(el.node, 'once', options.once);
    const id = <string>getInlineOption(el.node, 'id');
    const customClassNames =
      options.useClassNames && el.node.getAttribute('data-aos');

    const animatedClassNames = [options.animatedClassName]
      .concat(customClassNames ? customClassNames.split(' ') : [])
      .filter((className) => typeof className === 'string');

    if (options.initClassName) {
      el.node.classList.add(options.initClassName);
    }

    el.position = {
      in: getPositionIn(el.node, options),
      out: (mirror &&
        getPositionOut(el.node, options as AosSettings)) as number,
    };

    el.options = {
      once,
      mirror,
      animatedClassNames,
      id,
    };
  });

  return $elements;
};

export default prepare;

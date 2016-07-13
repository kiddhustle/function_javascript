import {func, checkTypes} from './types';
import {arrayOf} from './functors';

export const homoMorph = function(){
  let before = checkTypes(
    arrayOf(func)(Array.prototype.slice.call(arguments, 0, arguments.length -1 ))
  );

  let after = func(arguments[arguments.length-1]);
  return function(middle) {
    return function(args) {
      return after(middle.apply(this, before
      ([].slice.apply(arguments))));
    }
  }
};

import {func, str, arr} from './types';
import {Just, None, just} from './monads';
// map :: (a -> b) -> [a] -> [b]
export const map = function(f, a){
  return arr(a).map(func(f));
}
// strmap :: (str -> str) -> str -> str
export const strmap = function(f, s){
  return str(s).split('').map(func(f));
}
export function arrayOf(f) {
  return function(a) {
    return map(func(f), arr(a));
  }
}

export function maybeOf(f) {
  return function (m) {
    if(m instanceof None){
      return m;
    }
    else if(m instanceof Just) {
      return just(f(m.x));
    }
    else {
      throw new TypeError(`Error: Just or None expected, ${m.toString()} given.`);
    }
  }
}

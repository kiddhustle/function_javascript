import {func, str, arr} from './types';

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

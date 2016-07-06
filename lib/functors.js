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
// Monads
export function Maybe(){

}
Maybe.prototype.orElse = (y) => this instanceof Just ? this.x : y;

export function None(){

}

None.prototype = Object.create(Maybe.prototype);
None.prototype.constructor = None;
None.prototype.toString = ()=> 'None';

export const none = () => new None();

export const Just = function (x){
  this.x = x;
}

Just.prototype = Object.create(Maybe.prototype);
Just.prototype.constructor = Just;
Just.prototype.toString = () => `Just ${this.x}`;

export const just = function(x){
  return new Just(x);
}

export const maybe = (m) => {
  if(m instanceof None){
    return m;
  }
  else if(m instanceof Just){
    return just(m.x);
  }
  else {console.log(m);console.log(m instanceof Just);
    throw new TypeError(`Error: Just or None expected, ${m.toString()} given.`);
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

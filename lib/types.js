export function typeOf(type){
  return function(x){
    if(typeof x === type){
      return x;
    }
    else throw new TypeError(`Error: ${type} expected, ${typeof x} given.`);
  }
}

export function objectTypeOf(name){
  return function(o) {
    if (Object.prototype.toString.call(o) === `[object ${name}]`) {
      return o;
    }
    else {
      throw new TypeError(`Error: ${name} expected, something else given.`);
    }
  }
}

export const str = typeOf('string');

export const num = typeOf('number');

export const bool = typeOf('boolean');

export const func = typeOf('function');

export const obj = objectTypeOf('Object'),
  arr = objectTypeOf('Array'),
  date = objectTypeOf('Date'),
  div = objectTypeOf('HTMLDivElement');

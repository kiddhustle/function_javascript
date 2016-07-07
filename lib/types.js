import {arrayOf} from './functors';
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

export const checkTypes = function( typeSafeties ) {
  arrayOf(func)(arr(typeSafeties));
  var argLength = typeSafeties.length;
    return function(args) {
      arr(args);
      if (args.length != argLength) {
        throw new TypeError('Expected '+ argLength + ' arguments');
      }
      var results = [];
      for (var i=0; i<argLength; i++) {
        results[i] = typeSafeties[i](args[i]);
      }
      return results;
    }
}

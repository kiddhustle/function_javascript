import {func} from './types';
import {arrayOf} from './functors';

export function fcompose(){
  const args = Array.prototype.slice.apply(arguments);
  const funcs = arrayOf(func)(args);
  // return function that applies all functions
  return function(){
    let argsOfFuncs = Array.prototype.slice.apply(arguments);
    for (let i = funcs.length -1; i > 0; i-- ){
      argsOfFuncs = [funcs[i].apply(this, argsOfFuncs)];
    }
    return argsOfFuncs[0];
    // return f.call( this, g.apply(this, arguments) );
  }
}

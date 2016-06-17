import {func} from './types';

export function fcompose(f, g){
  const funcs =
  return function(){
    return f.call( this, g.apply(this, arguments) );
  }
}

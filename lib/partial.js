export const bindFirstArg = function(func, a){
  return function(b){
    return func(a, b);
  };
};

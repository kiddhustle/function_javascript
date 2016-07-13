export const trampoline = function(f) {
  while (f && f instanceof Function) {
    f = f.apply(f.context, f.args);
  }
  return f;
}

export const thunk = function(fn){
  return function(){
    let args = Array.prototype.slice.apply(arguments);
    return function(){
      return fn.apply(this, args);
    };
  };
};

export const Y = function(F) {
  return (function (f) {
    return f(f);
  } (function (f) {
      return F(function (x) {
        return f(f)(x);
      });
    })
  );
}

export const Ymem = function(F, cache) {
  if (!cache) {
    cache = {} ; // Create a new cache.
  }
  return function(arg) {
    if (cache[arg]) {
      // Answer in cache
      return cache[arg] ;
    }
    // else compute the answer
    var answer = (F(function(n){
      return (Ymem(F,cache))(n);
    }))(arg); // Compute the answer.
    cache[arg] = answer; // Cache the answer.
    return answer;
  };
}

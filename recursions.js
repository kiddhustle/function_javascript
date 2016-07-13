import {thunk} from './lib/monads';

const factorial = (n) => {
  // terminate
  if(n==0){
    return 1;
  }
  else {
    return n* factorial(n-1);
  }
};

// tail elimination optiimised
const factorialLZ = (n) => {
  let _fact = (x, n)=>{
    if(n==0){
      return x;
    }
    else {
      return _fact(n*x, n-1);
    }
  };
  return _fact(1, n);
};

const trampoline = function(f) {
  while (f && f instanceof Function) {
    f = f.apply(f.context, f.args);
  }
  return f;
}

const factorialT = function(n) {
    var _fact = function(x, n) {
      if (n == 0) {
        // base case
        return x;
      }
      else {
        // recursive case
        return _fact.bind(null, n*x, n-1);
      }
    }
  return trampoline(_fact.bind(null, 1, n));
}

const factorialThunk = function(n){
  let fact = thunk(function(x, n) {
    if (n == 0) {
      // base case
      return x;
    }
    else {
      // recursive case
      return fact(n*x, n-1);
    }
  });
return trampoline(fact(1, n));
};

const Y = function(F) {
  return (function (f) {
    return f(f);
  } (function (f) {
      return F(function (x) {
        return f(f)(x);
      });
    })
  );
}

const FactorialGen = function(factorial){
  return (function(n) {
    if (n == 0) {
      // base case
      return 1;
    }
    else {
      // recursive case
      return n * factorial(n - 1);
    }
  });
};

const FactorialGen2 = function (factorial) {
  return function(n) {
    var factorial = thunk(function (x, n) {
      if (n == 0) {
        return x;
      }
      else {
        return factorial(n * x, n - 1);
      }
    });
    return trampoline(factorial(1, n));
  }
};

let Factorial = Y(FactorialGen);
let Factorial2 = Y(FactorialGen2);

console.log(factorial(5));
console.log(factorialLZ(5));

console.log(factorialT(100));
console.log(factorialThunk(100));

console.log(Factorial(10));

console.log(Factorial2(10));
console.log(Factorial2(23456));

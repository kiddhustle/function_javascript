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

var factorialT = function(n) {
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
console.log(factorial(5));
console.log(factorialLZ(5));

console.log(factorialT(300));

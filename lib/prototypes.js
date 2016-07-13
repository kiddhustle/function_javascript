Function.prototype.partialApply = function(){

  var func = this;
  var args = Array.prototype.slice.call(arguments);
  return function(){
    return func.apply(this, args.concat(
      Array.prototype.slice.call(arguments)
    ));
  };
};

Function.prototype.partialApplyRight = function(){
  var func = this;
  var args = Array.prototype.slice.call(arguments);
  return function(){
    return func.apply(
      this,
      [].slice.call(arguments, 0)
        .concat(args)
    );

  };
};

Function.prototype.curry = function (numArgs) {
  var func = this;
  numArgs = numArgs || func.length;
  // recursively acquire the arguments
  function subCurry(prev) {

    return function (arg) {
      var args = prev.concat(arg);

      if (args.length < numArgs) {
        // recursive case: we still need more args
        return subCurry(args);
      }
      else {
        // base case: apply the function
        return func.apply(this, args);
      }

    };
  }
  return subCurry([]);
};

// In math, the composition of the f and g variables is defined as f(g(x)).
Function.prototype.compose = function(prevFunc){
  var nextFunc = this;
  return function(){
    return nextFunc.call(this, prevFunc.apply(this, arguments));
  };
};

Function.prototype.sequence = function(prevFunc){
  var nextFunc = this;
  return function(){
    return prevFunc.call(this, nextFunc.apply(this, arguments));
  }
};

Object.prototype.plusMixin = function(mixin){
  let newObj = this;
  newObj.prototype = Oject.create(this.prototype);
  newObj.prototype.constructor = newObj;
  for(let prop in mixin){
    if(mixin.hasOwnProperty(prop)){
      newObj.prototype[prop] = mixin[prop];
    }
  }
  return newObj;
};

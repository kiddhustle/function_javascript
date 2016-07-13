// Monads
export const Maybe = function(){};

Maybe.prototype.orElse = function(y) {
  return this instanceof Just ? this.x : y
};

export const None = function(){};

None.prototype = Object.create(Maybe.prototype);
None.prototype.constructor = None;
None.prototype.toString = ()=> 'None';

export const none = () => new None();

export const Just = function(x){
  return this.x = x;
}

Just.prototype = Object.create(Maybe.prototype);
Just.prototype.constructor = Just;
Just.prototype.toString = function() { return `Just ${this.x}`;};

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
/**
 * [function description]
 * @param  {[type]} get [description]
 * @param  {[type]} set [description]
 * @return {[type]}     [description]
 USAGE:
 var first = lens(
  function (a) { return arr(a)[0]; }, // get
  function (a, b) { return [b].concat(arr(a).slice(1)); } // set
);
 */
export const lens = function(get, set){
  let f = function(a){ get(a); };
  // getter
  f.get = (a) => get(a);
  // setter
  f.set = set;
  // modifier
  f.mod = (f, a) => set(a, f(get(a)));
  return f;
};

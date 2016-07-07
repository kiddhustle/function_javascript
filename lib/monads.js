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

/**
 * [transforms an array of arrays into a single array]
 * @param  {[type]} arrays [description]
 * @return {[type]}        [description]
 */
export const flatten = function(arrays){
  return arrays.reduce((p, n)=>p.concat(n));
};

/**
 * [invert the values in an array]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export const invert = function(arr){
  return arr.map((x, i, a)=>{
    return a[a.length - (i+1)];
  });
};

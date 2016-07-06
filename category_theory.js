import {str, num, bool, func, objectTypeOf,
  obj, arr, date, div
} from './lib/types';
import {arrayOf, maybe, maybeOf, just} from './lib/functors';

import {fcompose} from './lib/composition';

import {User} from './lib/classes';

// plusplus :: Int -> Int

function plusplus(n) {
  return num(n) + 1;
}
// timestampLength :: String -> Int
function timestampLength(t) { return num(str(t).length); }

// arrayOf :: (a -> b) -> ([a] -> [b])



const plusplusall = arrayOf(plusplus);
const strs = arrayOf(str);

// console.log(plusplusall([1,2,3]));
// console.log(plusplusall(['1','2','3']));

console.log(strs(['a','b','c']));
// console.log(strs(['a',2,'c']));
//
const negate = (n)=> Math.abs(num) * -1;

const add1 = (n)=> num(n) +1;

const square = (n)=> Math.pow( num(n), 2 );

const mult2 = (n)=> num(n) * 2;

const f = fcompose(negate, square, mult2, add1);
console.log(f(2));


maybe(just(123)).x; // Returns 123

console.log(maybeOf(plusplus)(just(123)).x); // Returns 124

// maybe(plusplus)(none()).orElse('none'); // returns 'none'


var user = new User();
user.getUsernameMaybe(); // Returns 'anonymous'
user.setUsername('Laura');
user.getUsernameMaybe(); // Returns 'Laura'

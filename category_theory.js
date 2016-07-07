import {str, num, bool, func, objectTypeOf,
  obj, arr, date, div, checkTypes
} from './lib/types';
import {arrayOf, maybe, maybeOf, just} from './lib/functors';

import {fcompose} from './lib/composition';

import {User} from './lib/classes';
import {lens} from './lib/monads';

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
console.log(user.getUsernameMaybe()); // Returns 'anonymous'
console.log(user.setUsername('Laura'));
console.log(user.getUsernameMaybe()); // Returns 'Laura'

// lens
let userName = lens(
  (u) => u.getUsernameMaybe(),
  (u, v) => {
    u.setUsername(v);
    return u.getUsernameMaybe()
  }
);

let bob = new User();
console.log(bob.setUsername('Bob'));
console.log(userName.get(bob));
console.log(userName.set(bob, 'Bobby'));
console.log(userName.get(bob));
// console.log(userName.mod(strToUpper, bob));
//
const homoMorph = function(){
  let before = checkTypes(
    arrayOf(func)(Array.prototype.slice.call(arguments, 0, arguments.length -1 ))
  );

  let after = func(arguments[arguments.length-1]);
  return function(middle) {
    return function(args) {
      return after(middle.apply(this, before
      ([].slice.apply(arguments))));
    }
  }
};

let lensHM = homoMorph(func, func, func)(lens);

let userNameHM = lensHM(
  (u)=>u.getUsernameMaybe(),
  (u,v)=>{
    u.setUsername(v);
    return u.getUsernameMaybe();
  }
);

let strToUpperCase = homoMorph(str,str)((s)=> s.toUpperCase());
let morphFirstLetter = homoMorph(func, str, str)((f, s)=> f(s[0]).concat(s.slice(1)));
let capFirstLetter = homoMorph(str, str)((s)=> morphFirstLetter(strToUpperCase, s));

// homomorphic lenses
let bill = new User();
userNameHM.set(bill, 'William');
console.log(userNameHM.get(bill));
//compose
let capitalizedUsername = fcompose(capFirstLetter, userNameHM.get);
userNameHM.set(bill, 'bill');
console.log(capitalizedUsername(bill, 'bill'));

// it's a good idea to use homoMorph on .set and .get too
var getUserName = homoMorph(obj, str)(userNameHM.get);
var setUserName = homoMorph(obj, str, str)(userNameHM.set);
getUserName(bill); // Returns: 'Bill'
setUserName(bill, 'Billy'); // Returns: 'Billy'
// now we can rewrite capatolizeUsername with the new setter
capitalizedUsername = fcompose(capFirstLetter, setUserName);
capitalizedUsername(bill, 'will'); // Returns: 'Will'
console.log(getUserName(bill)); // Returns: 'will'

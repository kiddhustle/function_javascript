import './lib/prototypes';
console.log(process.version);
var roundedSqrt = Math.round.compose(Math.sqrt);
console.log(roundedSqrt(5));

function function1(a){return a + ' 1';}

function function2(b){return b + ' 2';}

function function3(c){return c + ' 3';}

var composition = function3.compose(function2).compose(function1);

console.log( composition('count') ); // returns 'count 1 2 3'

var sequences = function1.sequence(function2).sequence(function3);

console.log( sequences('count') ); // returns 'count 1 2 3'


// library
// stringToArray :: String -> [Char]

function stringToArray(s) { return s.split(''); }

// arrayToString :: [Char] -> String
function arrayToString(a) { return a.join(''); }

// nextChar :: Char -> Char

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

// previousChar :: Char -> Char

function previousChar(c) {
  return String.fromCharCode(c.charCodeAt(0)-1);
}

// higherColorHex :: Char -> Char

function higherColorHex(c) {
  return c >= 'f' ? 'f' :
            c == '9' ? 'a' : nextChar(c)
  }

// lowerColorHex :: Char -> Char

function lowerColorHex(c) { return c <= '0' ? '0' :
  c == 'a' ? '9' :
  previousChar(c);
}

// raiseColorHexes :: String -> String

function raiseColorHexes(arr) {
  return arr.map(higherColorHex);
}

// lowerColorHexes :: String -> String

function lowerColorHexes(arr) {
  return arr.map(lowerColorHex);
}

var lighterColor = arrayToString
  .compose(raiseColorHexes)
  .compose(stringToArray);

var darkerColor = arrayToString
  .compose(lowerColorHexes)
  .compose(stringToArray);

console.log( lighterColor('af0189') ); // Returns: 'bf129a'

console.log( darkerColor('af0189') ); // Returns: '9e0078'


// component2hex :: Ints -> Int

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}
  // nums2hex :: Ints* -> Int

function nums2hex() {
  return Array.prototype.map.call(arguments,
  componentToHex).join('');
}


var lighterColors = lighterColor
  .compose(nums2hex.curry());

var darkerRed = darkerColor
  .compose(nums2hex.partialApply(255));

var lighterRgb2hex = lighterColor
  .compose(nums2hex.partialApply());

console.log( lighterColors(123, 0, 22) ); // Returns: 8cff11

console.log( darkerRed(123, 0) ); // Returns: ee6a00

console.log( lighterRgb2hex(123,200,100) ); // Returns: 8cd975

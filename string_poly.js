// at() polyfill
String.prototype.at2 = function (index) {
  const str = String(this);

  if (index < -str.length || index >= str.length) {
    return undefined;
  }
  const indexToBeFound = index < 0 ? str.length + index : index;
  return str[indexToBeFound];
};

const sentence1 = "The quick brown fox jumps over the lazy dog.";
let index = 5;
console.log(
  `An index of ${index} returns the character ${sentence1.at2(index)}`
);

index = -4;
console.log(
  `An index of ${index} returns the character ${sentence1.at2(index)}`
);

// charAt() polyfill
String.prototype.charAt2 = function (value) {
  const index = Number(value) || 0;
  const str = String(this);
  if (index < 0 || index >= str.length) {
    return "";
  }
  return str[index];
};

const anyString = "Brave new world";
console.log(`The character at index 0   is '${anyString.charAt2()}'`); // The character at index 0   is 'B'
console.log(`The character at index 0   is '${anyString.charAt2(0)}'`); //The character at index 0   is 'B'
console.log(`The character at index 1   is '${anyString.charAt2(1)}'`); // The character at index 1   is 'r'
console.log(`The character at index 2   is '${anyString.charAt2(2)}'`); // The character at index 2   is 'a'
console.log(`The character at index 3   is '${anyString.charAt2(3)}'`); //The character at index 3   is 'v'
console.log(`The character at index 4   is '${anyString.charAt2(4)}'`); // The character at index 4   is 'e'
console.log(`The character at index 999 is '${anyString.charAt2(999)}'`); // The character at index 999 is ''

// concat() polyfill
String.prototype.concat2 = function (...params) {
  const str = String(this);
  const result = params.map((param) => String(param)).join("");

  return str + result;
};

const hello = "Hello, ";
console.log(hello.concat("Kevin", ". Have a nice day.")); // Hello, Kevin. Have a nice day.

const greetList = ["Hello", " ", "Venkat", "!"];
console.log("".concat(...greetList)); // "Hello Venkat!"

console.log("".concat({})); // "[object Object]"
console.log("".concat([])); // ""
console.log("".concat(null)); // "null"
console.log("".concat(true)); // "true"
console.log("".concat(4, 5)); // "45"

// endsWith() polyfill
String.prototype.endsWith2 = function (searchString, endPosition) {
  const str = String(this);
  if (searchString instanceof RegExp) {
    throw new TypeError("Value provided should be a string");
  }
  if (endPosition === undefined) {
    endPosition = str.length;
  } else if (endPosition < 0) {
    endPosition = str.length + endPosition;
  }
  return (
    str.slice(endPosition - searchString.length, endPosition) === searchString
  );
};

const str1 = "To be, or not to be, that is the question.";

console.log(str1.endsWith2("question.")); // true
console.log(str1.endsWith2("to be")); // false
console.log(str1.endsWith2("to be", 19)); // true

// includes() polyfill
String.prototype.includes2 = function (searchString, position) {
  const str = String(this);
  if (searchString instanceof RegExp) {
    throw new TypeError("Value provided should be a string");
  }
  position = position ?? 0;
  position = Math.max(0, position);

  return str.indexOf(searchString, position) !== -1;
};

const str = "To be, or not to be, that is the question.";

console.log(str.includes2("To be")); // true
console.log(str.includes2("nonexistent")); // false
console.log(str.includes2("To be", 1)); // false
console.log(str.includes2("TO BE")); // false
console.log(str.includes2("")); // true

// indexOf() polyfill
String.prototype.indexOf2 = function (searchString, position) {
  const str = String(this);
  position = position ?? 0;
  if (position >= str.length) {
    return -1;
  }

  if (position < 0) {
    position = 0;
  }

  if (searchString === "") {
    return Math.min(position, str.length);
  }

  for (let i = position; i < str.length; ++i) {
    if (str.substring(i, i + searchString.length) === searchString) {
      return i;
    }
  }
  return -1;
};

console.log("Blue Whale".indexOf2("Blue")); // returns  0
console.log("Blue Whale".indexOf2("Wale")); // returns -1
console.log("Blue Whale".indexOf2("Whale", 0)); // returns  5
console.log("Blue Whale".indexOf2("Whale", 5)); // returns  5
console.log("Blue Whale".indexOf2("")); // returns  0
console.log("Blue Whale".indexOf2("", 9)); // returns  9

// lastIndexOf() polyfill
String.prototype.lastIndexOf2 = function (searchString, position) {
  const str = String(this);

  position =
    position === undefined
      ? str.length
      : Math.min(Number(position), str.length);

  if (searchString === "") {
    return Math.min(position, str.length);
  }

  for (let i = position; i >= 0; --i) {
    if (str.slice(i, i + searchString.length) === searchString) {
      return i;
    }
  }

  return -1;
};

console.log("canal".lastIndexOf2("a")); // 3
console.log("canal".lastIndexOf2("a", 2)); // 1
console.log("canal".lastIndexOf2("a", 0)); // -1
console.log("canal".lastIndexOf2("x")); // -1
console.log("canal".lastIndexOf2("")); // 5
console.log("canal".lastIndexOf2("", 2)); // 2
console.log("canal".lastIndexOf2("", 10)); // 5

// localeCompare() polyfill
String.prototype.localeCompare2 = function (compareString, locales, options) {
  locales = locales || undefined;
  options = options || {};

  const a = this.toString();
  const b = compareString.toString();

  if (a === b) return 0;

  if (a < b) return -1;
  if (a > b) return 1;

  return 0;
};

const a = "réservé";
const b = "RESERVE";

console.log(a.localeCompare1(b)); // 1

// match() polyfill
String.prototype.match2 = function (regex) {
  if (!(regex instanceof RegExp)) {
    regex = new RegExp(regex);
  }
  const str = String(this);
  const matches = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[0]);
    if (!regex.global) break;
  }
  return matches;
};

const matchStr = "Nothing will come of nothing.";
console.log(matchStr.match2()); // [""]

const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match2(regex);

console.log(found); //  ["T", "I"]

// matchAll() polyfill
String.prototype.matchAll2 = function (regex) {
  const str = String(this);
  if (!(regex instanceof RegExp)) {
    regex = new RegExp(regex, "g");
  }
  if (!regex.global) {
    throw new TypeError("RegExp must be global");
  }
  return (function* () {
    while ((match = regex.exec(str)) !== null) {
      yield match;
    }
  })();
};

const regexp = /t(e)(st(\d?))/g;
const REstr = "test1test2";

const array = [...REstr.matchAll2(regexp)];

console.log(array[0]); //["test1", "e", "st1", "1"]

console.log(array[1]); // ["test2", "e", "st2", "2"]

// padEnd() polyfill
String.prototype.padEnd2 = function (targetLength, padString) {
  const str = String(this);
  if (targetLength <= str.length) {
    return str;
  }
  padString = padString === undefined ? " " : String(padString);

  const padLength = targetLength - str.length;
  return padLength > 0 ? str + padString.repeat(padLength) : str;
};

const padStr = "Breaded Mushrooms";
console.log(padStr.padEnd2(25, ".")); // "Breaded Mushrooms........"

const padStr2 = "200";
console.log(padStr2.padEnd2(5)); // 200

// padStart() polyfill
String.prototype.padStart2 = function (targetLength, padString) {
  const str = String(this);
  if (targetLength <= str.length) {
    return str;
  }
  padString = padString === undefined ? " " : String(padString);
  const padLength = targetLength - str.length;

  const fullPad = padString
    .repeat(Math.ceil(padLength / padString.length))
    .slice(0, padLength);
  return fullPad + str;
};
console.log("123".padStart2(6, "0")); // 000123
console.log("test".padStart2(10, "*")); // ******test
console.log("abc".padStart2(2)); // abc
console.log("hello".padStart2(8)); //   hello

// repeat() polyfill
String.prototype.repeat2 = function (count) {
  const str = String(this);
  if (count < 0 || count === Infinity) {
    throw new RangeError("Invalid count value");
  }
  count = Math.floor(count);
  let result = "";
  for (let i = 0; i < count; ++i) {
    result += str;
  }
  return result;
};

const mood = "Happy! ";
console.log(`I feel ${mood.repeat2(3)}`); // "I feel Happy! Happy! Happy! "

console.log("abc".repeat(-1)); // RangeError
console.log("abc".repeat(0)); // ''
console.log("abc".repeat(1)); // 'abc'
console.log("abc".repeat(2)); // 'abcabc'
console.log("abc".repeat(3.5)); // 'abcabcabc'

// replaceAll() polyfill
String.prototype.replaceAll2 = function (pattern, replacement) {
  if (typeof pattern !== "string" && !(pattern instanceof RegExp)) {
    throw new TypeError("The pattern must be a string or a RegExp.");
  }
  if (pattern instanceof RegExp && !pattern.global) {
    throw new TypeError("RegExp must be global");
  }
  if (typeof pattern === "string") {
    return this.split(pattern).join(replacement);
  }
  if (pattern instanceof RegExp) {
    return this.split(pattern).join(replacement);
  }
};

const txtToReplace = "I think Ruth's dog is cuter than your dog!";

console.log(txtToReplace.replaceAll2("dog", "monkey")); // "I think Ruth's monkey is cuter than your monkey!"

const regexToReplace = /Dog/gi;
console.log(txtToReplace.replaceAll2(regexToReplace, "ferret")); // "I think Ruth's ferret is cuter than your ferret!"

// slice() polyfill
String.prototype.slice2 = function (indexStart, indexEnd) {
  let str = String(this);
  if (indexStart >= str.length || indexEnd <= indexStart) {
    return "";
  }
  if (indexStart < 0) {
    indexStart = str.length + indexStart;
  }
  if (indexEnd === undefined || indexEnd >= str.length) {
    indexEnd = str.length;
  }
  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd;
  }
  return str.substring(indexStart, indexEnd);
};

const strToSlice = "The quick brown fox jumps over the lazy dog.";

console.log(strToSlice.slice2(31)); //"the lazy dog."

console.log(strToSlice.slice2(4, 19)); // "quick brown fox"

console.log(strToSlice.slice2(-4)); // "dog."

console.log(strToSlice.slice2(-9, -5)); //"lazy"

// split() polyfill
String.prototype.split2 = function (separator, limit) {
  const str = String(this);
  if (separator === undefined) {
    return [str];
  }
  if (limit === 0) {
    return [];
  }
  if (separator === "") {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      if (limit !== undefined && result.length >= limit) {
        break;
      }
      result.push(str[i]);
    }
    return result;
  }

  const result = [];
  let index = 0;
  let match;

  while ((match = str.indexOf(separator, index)) !== -1) {
    result.push(str.slice(index, match));
    index = match + separator.length;
    if (limit !== undefined && result.length === limit - 1) {
      break;
    }
  }
  result.push(str.slice(index));
  return result;
};

const strToSplit = "The quick brown fox jumps over the lazy dog.";

const words = strToSplit.split2(" ");
console.log(words[3]); // "fox"

const chars = strToSplit.split2("");
console.log(chars[8]); // "k"

const strCopy = strToSplit.split2();
console.log(strCopy); //["The quick brown fox jumps over the lazy dog."]

// startsWith() polyfill

String.prototype.startsWith2 = function (searchString, position) {
  if (!(searchString instanceof RegExp)) {
    searchString = String(searchString);
  }
  position = position ?? 0;
  return this.slice(position, position + searchString.length) === searchString;
};
const strStWith = "Saturday night plans";
console.log(strStWith.startsWith2("Sat")); // true
console.log(strStWith.startsWith2("Sat", 3)); // false

// toLowerCase() polyfill

String.prototype.toLowerCase2 = function () {
  return this.replace(/[A-Z]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 32);
  });
};

const upperCased = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.";
console.log(upperCased.toLowerCase2()); //"the quick brown fox jumps over the lazy dog."

// toString() polyfill

String.prototype.toString2 = function () {
  if (this == null) {
    throw new TypeError("Cannot call toString on null or undefined");
  }
  return String(this);
};

const stringObj = new String("foo");
console.log(stringObj.toString2()); // "foo"

// toUpperCase() polyfill
String.prototype.toUpperCase2 = function () {
  return this.replace(/[a-z]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 32);
  });
};

const lowerCased = "the quick brown fox jumps over the lazy dog.";
console.log(lowerCased.toUpperCase2()); //"THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."

// trim() polyfill
String.prototype.trim2 = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

const txtToTrim = "   Hello world!   ";
console.log(txtToTrim); // "   Hello world!   ";
console.log(txtToTrim.trim2()); // "Hello world!";

// trimEnd() polyfill
String.prototype.trimEnd2 = function () {
  return this.replace(/\s+$/g, "");
};

const txtToTrim1 = "   Hello world!   ";
console.log(txtToTrim1); // "   Hello world!   ";
console.log(txtToTrim1.trimEnd2()); //"   Hello world!";

// trimStart() polyfill
String.prototype.trimStart2 = function () {
  return this.replace(/^\s+/g, "");
};

const txtToTrim2 = "   Hello world!   ";
console.log(txtToTrim2); // "   Hello world!   ";
console.log(txtToTrim2.trimStart2()); // "Hello world!    ";

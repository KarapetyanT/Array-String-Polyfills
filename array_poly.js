// at() polyfill
Array.prototype.at2 = function (index) {
  if (index < -this.length || index >= this.length) {
    return undefined;
  }
  if (index < 0) {
    return this[this.length + index];
  }
  return this[index];
};

let arr = ["red", "green", "blue", "yellow"];
console.log(arr.at2(2));

// concat() polyfill
Array.prototype.concat2 = function (...rest) {
  let result = [];
  for (let i = 0; i < this.length; ++i) {
    result.push(this[i]);
  }
  for (let i = 0; i < rest.length; ++i) {
    let item = rest[i];
    if (Array.isArray(item)) {
      for (let j = 0; j < item.length; ++j) {
        result.push(item[j]);
      }
    } else {
      result.push(item);
    }
  }
  return result;
};

let arr1 = [1, 2, 3];
let arr2 = ["Aram", "Ani", "Mary"];
console.log(arr1.concat2(arr2));

// copyWithin() polyfill

Array.prototype.copyWithin2 = function (target, start, end) {
  start = start ?? 0;
  end = end ?? this.length;
  for (let i = start; i < end; ++i) {
    this[target + i] = this[i];
  }
  return this;
};

const arrayToCopy = ["a", "b", "c", "d", "e"];
console.log(arrayToCopy.copyWithin(0, 3, 4));

// entries() polyfill
Array.prototype.entries2 = function () {
  let start = 0;
  const end = this.length;
  const array = this;
  return {
    next() {
      if (start < end) {
        const result = { value: [start, array[start]], done: false };
        start++;
        return result;
      } else {
        return { value: undefined, done: true };
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const arrayEntries = ["a", "b", "c"];
const iterator1 = arrayEntries.entries2();

console.log(iterator1.next().value); // [0, 'a']
console.log(iterator1.next().value); // [1, 'b']
console.log(iterator1.next().value); // [2, 'c']
console.log(iterator1.next().value); // undefined

// every() polyfill
Array.prototype.every2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; ++i) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

let arr4 = [14, 5, 32, 24, 56, 8, 2];
console.log(arr4.every2((item) => item % 2 === 0));

// fill() polyfill
Array.prototype.fill2 = function (value, start, end) {
  start =
    start < 0 ? Math.max(this.length + start, 0) : Math.min(start, this.length);
  end = end < 0 ? Math.max(this.length + end, 0) : Math.min(end, this.length);

  for (let i = start; i < end; ++i) {
    this[i] = value;
  }
  return this;
};

let arr5 = [1, 2, 3, 4, 5];
console.log(arr5.fill2(4, 2, 4));

// filter() polyfill

Array.prototype.filter2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let result = [];
  for (let i = 0; i < this.length; ++i) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

let arr6 = ["green", "red", "blue", "yellow"];
console.log(arr6.filter2((item) => item.length > 4));

// find() polyfill
Array.prototype.find2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; ++i) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};
const arr7 = [2, 5, 18, 7, 25];

const found = arr7.find2((element) => element > 10);
console.log(found);

// findIndex() polyfill

Array.prototype.findIndex2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; ++i) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

const array1 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;
console.log(array1.findIndex2(isLargeNumber));

// findLast() polyfill
Array.prototype.findLast2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = this.length - 1; i >= 0; --i) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

const arr8 = [2, 5, 18, 25, 7];
const found1 = arr8.findLast2((element) => element > 10);
console.log(found1);

// findLastIndex() polyfill

Array.prototype.findLastIndex2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = this.length - 1; i >= 0; --i) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

const array2 = [5, 12, 50, 130, 44, 88, 13];
const last = (element) => element > 45;
console.log(array2.findLastIndex2(last));

// flat() polyfill
Array.prototype.flat2 = function () {
  let temp = [];
  for (let i = 0; i < this.length; ++i) {
    if (Array.isArray(this[i])) {
      temp = temp.concat(this[i]);
    } else {
      temp.push(this[i]);
    }
  }
  return temp;
};
const arr9 = [0, 1, 2, [3, 4]];

console.log(arr9.flat2());

// flatMap() polyfill

Array.prototype.flatMap2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let temp = [];
  for (let i = 0; i < this.length; ++i) {
    let item = callback(this[i], i, this);
    if (Array.isArray(item)) {
      temp = temp.concat(item);
    } else {
      temp.push(item);
    }
  }
  return temp;
};

const arr10 = [1, 2, 1];
const result = arr10.flatMap2((num) => (num === 2 ? [2, 2] : 1));
console.log(result);

// forEach() polyfill
Array.prototype.forEach2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; ++i) {
    if (this[i] !== undefined) {
      callback(this[i], i, this);
    }
  }
};
const array11 = ["a", "b", , "c"];
array11.forEach2((element) => console.log(element));

// includes() polyfill

Array.prototype.includes2 = function (searchElement, fromIndex) {
  if (fromIndex <= this.length - 1 || fromIndex < 0) {
    fromIndex = fromIndex + this.length;
  }
  if (fromIndex >= this.length) {
    return false;
  } else {
    for (let i = 0; i < this.length; ++i) {
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  }
};

const pets = ["cat", "dog", "bat"];
console.log(pets.includes2("cat"));
console.log(pets.includes2("at"));
console.log([1, 2, 3].includes2(3, -1));

// indexOf() polyfill

Array.prototype.indexOf2 = function (searchElement, fromIndex) {
  if (fromIndex <= this.length - 1 || fromIndex < 0) {
    fromIndex = fromIndex + this.length;
  }
  if (fromIndex >= this.length) {
    return -1;
  }
  if (searchElement !== undefined) {
    for (let i = 0; i < this.length; ++i) {
      if (this[i] === searchElement) {
        return i;
      }
    }
  }
  return -1;
};

const beasts = ["ant", "bison", "camel", "duck", "bison"];
console.log(beasts.indexOf2("bison"));
const array = [NaN];
console.log(array.indexOf2(NaN));

// join() polyfill

Array.prototype.join2 = function (separator = ",") {
  let result = "";
  for (let i = 0; i < this.length; ++i) {
    if (Array.isArray(this[i])) {
      for (let j = 0; j < this[i].length; ++j) {
        result += this[i][j] + separator;
      }
    } else {
      result += this[i] + separator;
    }
  }
  return result
    .replace(/null/g, "")
    .replace(/undefined/g, "")
    .replace(/0/g, "");
};

const elements = ["Fire", "Air", , "Water", undefined, null];
console.log(elements.join2());

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix.join2());

// keys() polyfill

Array.prototype.keys2 = function () {
  let result = [];
  for (let i = 0; i < this.length; ++i) {
    result.push(i);
  }
  return result;
};

const array12 = ["a", "b", , "c"];
const iterator = array12.keys2();

for (const key of iterator) {
  console.log(key);
}

// lastIndexOf() polyfill

Array.prototype.lastIndexOf2 = function (searchElement, fromIndex) {
  if (fromIndex <= this.length - 1 || fromIndex < 0) {
    fromIndex = fromIndex + this.length;
  }
  if (fromIndex >= this.length) {
    return -1;
  }
  if (searchElement !== undefined) {
    for (let i = this.length - 1; i >= 0; --i) {
      if (this[i] === searchElement) {
        return i;
      }
    }
  }
  return -1;
};

const animals = ["Dodo", "Tiger", "Penguin", NaN, "Dodo"];
console.log(animals.lastIndexOf2(NaN));

const numbers = [2, 5, 9, 2];
console.log(numbers.lastIndexOf2(2));
console.log(numbers.lastIndexOf2(7));
console.log(numbers.lastIndexOf(2, 2));
console.log(numbers.lastIndexOf(2, -2));
console.log(numbers.lastIndexOf2(2, -1));

// map() polyfill
Array.prototype.map2 = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let temp = [];
  for (let i = 0; i < this.length; ++i) {
    temp.push(callback.call(thisArg, this[i], i, this));
  }
  return temp;
};

const nums = [1, 4, 9];
const roots = nums.map2((num) => Math.sqrt(num));
console.log(roots);

// pop() polyfill

Array.prototype.pop2 = function () {
  if (this.length === 0) {
    return undefined;
  }
  const popedElem = this[this.length - 1];
  this.length = this.length - 1;
  return popedElem;
};

const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const popped = myFish.pop2();
console.log(myFish);
console.log(popped);

// push() polyfill

Array.prototype.push2 = function (item, ...items) {
  this[this.length] = item;
  for (let i = 0; i < items.length; ++i) {
    this[this.length] = items[i];
  }
  return this.length;
};

const animal = ["pigs", "goats", "sheep"];
const count = animal.push2("cows");
console.log(count);
console.log(animal);

const vegetables = ["parsnip", "potato"];
const moreVegs = ["celery", "beetroot"];
vegetables.push2(...moreVegs);
console.log(vegetables);

// reduce() polyfill
Array.prototype.reduce2 = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let acc = initialValue ?? this[0];
  let start = initialValue ? 0 : 1;
  for (let i = start; i < this.length; ++i) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

const nums2 = [1, 2, 3, 4];
const sum = nums2.reduce2((acc, num) => acc + num);
console.log(sum);

// reverse() polyfill
Array.prototype.reverse2 = function () {
  let left = 0;
  let right = this.length - 1;
  while (left < right) {
    [this[left], this[right]] = [this[right], this[left]];
    left++;
    right--;
  }
  return this;
};

let namesArr = ["Ani", "Mary", "Aram"];
console.log(namesArr.reverse2());
let numsArr = [1, 2, 3, 4];
console.log(numsArr.reverse2());

// shift() polyfill

Array.prototype.shift2 = function () {
  if (this.length === 0) {
    return undefined;
  }
  const shiftedElem = this[0];
  for (let i = 1; i < this.length; ++i) {
    this[i - 1] = this[i];
  }
  this.length = this.length - 1;
  return shiftedElem;
};

const arrayShift = [1, 2, 3, 4, 5];
const firstElement = arrayShift.shift2();
console.log(arrayShift);
console.log(firstElement);

// slice() polyfill
Array.prototype.slice2 = function (start, end) {
  start = start ?? 0;
  end = end ?? this.length;

  const result = [];
  for (let i = start; i < end; ++i) {
    result.push(this[i]);
  }
  return result;
};

const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice2(1, 4);
console.log(citrus);

// some() polyfill

Array.prototype.some2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; ++i) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};
const someArr = [1, 8, 3, 5, 4];
const even = (element) => element % 2 === 0;
console.log(someArr.some2(even));

// sort() polyfill
Array.prototype.sort2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length - 1; ++i) {
    for (let j = 0; j < this.length - i - 1; ++j) {
      const result = callback(this[j], this[j + 1]);
      if (result > 0) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
};

const nu = [1, 5, 4, 3, 8];
console.log(nu.sort2((a, b) => a - b));

// splice() polyfill

Array.prototype.splice2 = function (start, deleteCount, ...items) {
  let main = this.slice(start, start + deleteCount);
  let end = this.slice(start + deleteCount);
  this.length = start;
  this.push(...items);
  this.push(...end);
  return main;
};

const months = ["Jan", "March", "April", "June"];
months.splice2(1, 0, "Feb");
console.log(months);

// toReversed() polyfill

Array.prototype.toReversed2 = function () {
  let temp = [...this];
  for (let i = 0; i < Math.floor(temp.length / 2); ++i) {
    let n = temp.length - 1 - i;
    [temp[i], temp[n]] = [temp[n], temp[i]];
  }
  return temp;
};
const items = [1, 2, 3];
const reversedItems = items.toReversed2();
console.log(reversedItems);
console.log(items);

// toSorted() polyfill
Array.prototype.sort2 = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let temp = [...this];
  for (let i = 0; i < temp.length - 1; ++i) {
    for (let j = 0; j < temp.length - i - 1; ++j) {
      const result = callback(temp[j], temp[j + 1]);
      if (result > 0) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
      }
    }
  }
  return temp;
};

const originalArr = [1, 5, 4, 3, 8];
const toSorted = originalArr.sort2((a, b) => a - b);
console.log(originalArr);
console.log(toSorted);

// toSpliced() polyfill

Array.prototype.toSpliced2 = function (start, deleteCount, ...items) {
  let temp = [];
  for (let i = 0; i < this.length; ++i) {
    if (i < start) {
      temp.push(this[i]);
    }
    if (i === start) {
      temp.push(...items);
    }
    if (i >= start && i < start + deleteCount) {
      continue;
    }
    if (i >= start + deleteCount) {
      temp.push(this[i]);
    }
  }
  if (start >= this.length) {
    temp.push(...items);
  }
  return temp;
};

let arrToSpliced = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let spliced = arrToSpliced.toSpliced2(3, 3, "a", "b", "c");
console.log(arrToSpliced);
console.log(spliced);

const monthsToSpliced = ["Jan", "March", "April", "June"];
let newMonths = monthsToSpliced.toSpliced2(1, 0, "Feb");
console.log(monthsToSpliced);
console.log(newMonths);

// toString() polyfill
Array.prototype.toString2 = function (separator = ",") {
  let result = "";
  for (let i = 0; i < this.length; ++i) {
    if (Array.isArray(this[i])) {
      for (let j = 0; j < this[i].length; ++j) {
        result += this[i][j] + separator;
      }
    } else {
      result += this[i] + separator;
    }
  }
  return result;
};

const arrayToStr = [1, 2, "a", "1a"];
console.log(arrayToStr.toString2());

const matrixToStr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrixToStr.toString2());

// unshift() polyfill

Array.prototype.unshift2 = function (...items) {
  let temp = [...items, ...this];
  for (let i = 0; i < temp.length; ++i) {
    this[i] = temp[i];
  }
  this.length = temp.length;
  return this.length;
};

const animalArr = ["pigs", "goats", "sheep"];
const unshiftCount = animalArr.unshift2("cows");
console.log(unshiftCount);
console.log(animalArr);

const origArr = ["parsnip", "potato"];
const arrUnshift = ["celery", "beetroot"];
origArr.unshift2(...arrUnshift);
console.log(origArr);

const arrNum = [1, 2, 3];
console.log(arrNum.unshift2(4, 5));
console.log(arrNum);

// values() polyfill

Array.prototype.values2 = function () {
  let result = [];
  for (let i = 0; i < this.length; ++i) {
    result.push(this[i]);
  }
  return result;
};

const arrNext = ["a", "b", "c", "d", "e"];
const iterator3 = arrNext.values();
console.log(iterator.next());

const arrVal = ["a", "b", "c"];
const iterator2 = arrVal.values2();
for (const value of iterator2) {
  console.log(value);
}

// with() polyfill
Array.prototype.with2 = function (index, value) {
  if (index >= this.length || index < -this.length) {
    throw new RangeError("Index is out of range");
  }
  if (index < 0) {
    index += this.length;
  }
  const temp = [...this];
  temp[index] = value;
  return temp;
};

const arrWith = [1, 2, 3, 4, 5];
console.log(arrWith.with2(2, 6));
console.log(arrWith);

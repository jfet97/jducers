# jducers
A js transducers-like implementation using generators and async generators.

A composed function expecting a combination function to make a reducer is called **transducer**.
Transducers are useful to compose adjacent **map()**, **filer()** and **reduce()** operations together to improve performaces.

A **jducer** is similar to a transducer because it is a composed function and can be used to compose **map()**, **filer()** and **reduce()** operations together, but there are some differences.

It was a challenge against myself to see how far could I go using generators.

## install

```sh
$ npm i --save jducers
```

## utility
A little fp utility library used by jducers and available for you with **pipe**, **compose** and **curry**

```js
import { pipe, compose, curry } from 'jducers/src/utility';
```

## sync
Sync's jducers helpers: 

```js
import { map, filter, reduce, run }  from 'jducers/src/jducers/sync'
```
or
```js
import * as SJ from 'jducers/src/jducers/sync'
```

* **map**: accepts only a mapper function that is up to you and returns a function used in the creation of a **jducer**
* **filter**: accepts only a predicate function that is up to you and returns a function used in the creation of a **jducer**
* **reduce**: accepts two parameters: a reducer function with some constraints and an optional initial value and returns a function used in the creation of a **jducer**. The reducer function will be called with only two parameters: the accumulator and the current processed value
* **run**: accepts two parameters: a composition (you can use **pipe** or **compose** from my utility library) and a sync iterable like an array. Returns the resulted array or a single value, depends on the functions used in the composition

```js
import * as SJ from 'jducers/src/jducers/sync'
import { pipe } from 'jducers/src/utility';

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const isOdd = i => !!(i % 2); // predicate function
const double = i => i * i; // mapper function
const sum = (acc, val) => acc + val; // reducer

const syncIsOddFilter = SJ.filter(isOdd);
const syncDoubleMap = SJ.map(double);
const syncSumReduce = SJ.reduce(sum);

let jducer = pipe(syncIsOddFilter, syncDoubleMap);
let res = SJ.run(jducer, array); // [2, 6, 10, 14, 18, 22, 26, 30, 34, 38]

jducer = pipe(syncIsOddFilter, syncDoubleMap, syncSumReduce);
res = SJ.run(jducer, array); // 200
```


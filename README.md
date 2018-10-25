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
* **run**: accepts two parameters: a composition (you can use **pipe** or **compose** from my utility library) and a sync iterable like an array. Returns the resuling array or a single value.It depends on the functions used in the composition

```js
import * as SJ from 'jducers/src/jducers/sync'
import { pipe } from 'jducers/src/utility';

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const isOdd = i => !!(i % 2); // predicate function
const double = i => i * 2; // mapper function
const sum = (acc, val) => acc + val; // reducer

const syncIsOddFilter = SJ.filter(isOdd);
const syncDoubleMap = SJ.map(double);
const syncSumReduce = SJ.reduce(sum);

let jducer = pipe(syncIsOddFilter, syncDoubleMap);
let res = SJ.run(jducer, array);
console.log(res); // [2, 6, 10, 14, 18, 22, 26, 30, 34, 38]

jducer = pipe(syncIsOddFilter, syncDoubleMap, syncSumReduce);
res = SJ.run(jducer, array);
console.log(res); // 200
```

## async
Async's jducers helpers (useful for async iterables and concurrent iterations): 

```js
import { map, filter, reduce, run, observerFactory }  from 'jducers/src/jducers/async'
```
or
```js
import * as AJ from 'jducers/src/jducers/async'
```

* **map**: accepts only a mapper function that is up to you and returns a function used in the creation of a **jducer**
* **filter**: accepts only a predicate function that is up to you and returns a function used in the creation of a **jducer**
* **reduce**: accepts two parameters: a reducer function with some constraints and an optional initial value and returns a function used in the creation of a **jducer**. The reducer function will be called with only two parameters: the accumulator and the current processed value
* **run**: accepts two parameters: a composition (you can use **pipe** or **compose** from my utility library) and an async iterable like an array of promises. Returns a promise that will be fulfilled with the resulting array or a single value. It depends on the functions used in the composition
* **observerFactory**: accepts one or more callbacks and returns a simple observer that calls them when each single value of our async iterable flows through it. The observer has to be placed in a composition to form the **jducer**

```js
import * as AJ from 'jducers/src/jducers/async'
import { pipe } from 'jducers/src/utility';

const asyncArray = {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [Symbol.asyncIterator]: async function* () {
        for (const x of this.array) {
            await new Promise(ok => setTimeout(() => ok(x), 2000));
            yield x;
        }
    }
}

const isOdd = i => !!(i % 2); // predicate function
const double = i => i * 2; // mapper function
const sum = (acc, val) => acc + val; // reducer

const asyncIsOddFilter = AJ.filter(isOdd);
const asyncDoubleMap = AJ.map(double);
const asyncSumReduce = AJ.reduce(sum);

let jducer = pipe(asyncIsOddFilter, asyncDoubleMap);
let res = AJ.run(jducer, asyncArray); 
res.then(x => console.log(x)); // [2, 6, 10, 14, 18, 22, 26, 30, 34, 38]

jducer = pipe(asyncIsOddFilter, asyncDoubleMap, asyncSumReduce);
res = AJ.run(jducer, asyncArray); 
res.then(x => console.log(x)); // 200

const observer = AJ.observerFactory(console.log);
/*
  const observer = observerFactory();
  observer.add(console.log);
*/
  
jducer = pipe(observer, asyncDoubleMap, observer, asyncSumReduce);
// we will see each value before and after the double mapper function
// 1 2 2 4 3 6 4 8 5 10 6 12 ...
res = AJ.run(jducer, asyncArray); 
res.then(x => console.log(x)); // 420

// WARNING: OUTPUTS ARE IN CONCURRENCY
```

## weight

All modules and functions together are 3.284Kb **without** compression


## License

MIT


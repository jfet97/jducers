import { pipe, compose } from 'jducers/src/utility';
import * as J from 'jducers/src/jducers/sync'

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const isOdd = i => !!(i % 2); // predicate
const double = i => i * i; // map cb
const minusOne = i => --i; // map cb
const plusTre = (acc, val) => (acc.push(val + 3), acc); // reducer
const sum = (acc, val) => acc + val; // reducer
const mult = (acc, val) => acc * val; // reducer

const doubleMap = J.map(double);
const minusOneMap = J.map(minusOne);
const isOddFilter = J.filter(isOdd);
const plusTreReduce = J.reduce(plusTre, []);
const sumReduce = J.reduce(sum);
const multiplyReduce = J.reduce(mult, 1);


let jducer = pipe(isOddFilter, minusOneMap, doubleMap, plusTreReduce);
let res = J.run(jducer, array);
console.log(res);

let jducer2 = compose(doubleMap, minusOneMap, isOddFilter);
res = J.run(jducer2, array);
console.log(res);

let jducer3 = compose(sumReduce, doubleMap, minusOneMap, isOddFilter);
res = J.run(jducer3, array);
console.log(res);

let jducer4 = compose(multiplyReduce, doubleMap, isOddFilter);
res = J.run(jducer4, array);
console.log(res);

let jducer5 = compose(doubleMap, sumReduce, minusOneMap, isOddFilter);
res = J.run(jducer5, array);
console.log(res);

import { pipe, compose } from 'jducers/src/utility';
import * as SJ from 'jducers/src/jducers/sync'

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const isOdd = i => !!(i % 2); // predicate
const double = i => i * i; // map cb
const minusOne = i => --i; // map cb
const plusTre = (acc, val) => (acc.push(val + 3), acc); // reducer
const sum = (acc, val) => acc + val; // reducer
const mult = (acc, val) => acc * val; // reducer

const doubleMap = SJ.map(double);
const minusOneMap = SJ.map(minusOne);
const isOddFilter = SJ.filter(isOdd);
const plusThreeReduce = SJ.reduce(plusTre, []);
const sumReduce = SJ.reduce(sum);
const multiplyReduce = SJ.reduce(mult, 1);


let jducer = pipe(isOddFilter, minusOneMap, doubleMap, plusThreeReduce);
let res = SJ.run(jducer, array);
console.log(res);

let jducer2 = compose(doubleMap, minusOneMap, isOddFilter);
res = SJ.run(jducer2, array);
console.log(res);

let jducer3 = compose(sumReduce, doubleMap, minusOneMap, isOddFilter);
res = SJ.run(jducer3, array);
console.log(res);

let jducer4 = compose(multiplyReduce, doubleMap, isOddFilter);
res = SJ.run(jducer4, array);
console.log(res);

let jducer5 = compose(doubleMap, sumReduce, minusOneMap, isOddFilter);
res = SJ.run(jducer5, array);
console.log(res);

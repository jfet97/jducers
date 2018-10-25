import { pipe, compose } from 'jducers/src/utility';
import * as AJ from 'jducers/src/jducers/async'

const asyncArray = {
    array: [1, 2, 3, 4, 5],
    [Symbol.asyncIterator]: async function* () {
        for (const x of this.array) {
            await new Promise(ok => setTimeout(() => ok(x), 3000));
            yield x;
        }
    }
}

const sumReducer = AJ.reduce((x, y) => x + y, 0);
const doubleMap = AJ.map(x => x * 2);

(async function IIFE() {
    await AJ.run(pipe(doubleMap, sumReducer), asyncArray);
})();


let myObserver = AJ.observerFactory(console.log, (x) => console.log(x + x));

(async function IIFE() {
    await AJ.run(pipe(myObserver, doubleMap, myObserver, sumReducer, myObserver), asyncArray);
})();

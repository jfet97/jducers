import { pipe, compose } from 'jducers/src/utility';
import * as AJ from 'jducers/src/jducers/sync'

const asyncArray = {
    array: [1, 2, 3, 4, 5],
    [Symbol.asyncIterator]: async function* () {
        for (const x of this.array) {
            await new Promise(ok => setTimeout(() => ok(x), 3000));
            yield x;
        }
    }
}

const sumReducer = AJ.reduce((x, y) => x + y, 0)
const doubleMap = AJ.map(x => x * 2)
await AJ.run(pipe(doubleMap, sumReducer), asyncArray);

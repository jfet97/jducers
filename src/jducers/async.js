import { curryForReduce, curry } from './../utility';



async function* _filter(pred, input) {
    for await (const x of input) pred(x) ? yield x : null;
}

async function* _map(fun, input) {
    for await (const x of input) yield fun(x);
}

async function* _reduce(reducer, initValue, input) {

    const iterator = input[Symbol.asyncIterator]();

    let flag = false;
    if (initValue instanceof Array) flag = true;

    let acc;
    if (initValue != undefined) {
        acc = initValue;
    } else {
        acc = (await iterator.next()).value;
        if (flag) yield acc;
    }

    for await (const x of iterator) {
        acc = reducer(acc, x);
        if (flag) yield acc[acc.length ? acc.length - 1 : 0]
    }
    if (!flag) yield acc;
}

function observerFactory(...cbs) {

    const callbacks = [...cbs];

    async function* observer(input) {
        for await (const x of input) {
            callbacks.forEach(cb => cb(x));
            yield x;
        }
    }

    observer.add = (...cbs) => observer.callbacks.push(...cbs);
    return observer;
}



async function run(jducer, input) {
    const res = [];
    for await (const x of jducer(input)) {
        res.push(x);
    }
    return res.length == 1 ? res[0] : res;
}



const map = curry(_map);
const filter = curry(_filter);
const reduce = curryForReduce(_reduce);

export { map, filter, reduce, run, observerFactory }
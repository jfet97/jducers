import { curryForReduce, curry } from './../utility';

function* _map(fun, input) {
    for (const x of input) yield fun(x);
}

function* _filter(pred, input) {
    for (const x of input) pred(x) ? yield x : null;
}

function* _reduce(reducer, initValue, input) {

    // if input was already an iterator, following operation return itself
    // if input was not an iterator, following operation return its iterator
    const iterator = input[Symbol.iterator]();

    let flag = false;
    if (initValue instanceof Array) flag = true;

    // if the output is an array, reduce has to behave like a map/filter
    // values must flow 
    // if the output is a single number for example, reduce has to interrupt
    // the flows of values until she has done her job

    let acc;
    if (initValue != undefined) {
        acc = initValue;
    } else {
        acc = iterator.next().value;
        if (flag) yield acc;
    }

    for (const x of iterator) {
        acc = reducer(acc, x);
        if (flag) yield acc[acc.length ? acc.length - 1 : 0]
    }
    if (!flag) yield acc;
}

function run(jducer, input) {
    const res = [];
    for (const x of jducer(input)) {
        res.push(x);
    }
    return res.length == 1 ? res[0] : res;
}

const map = curry(_map);
const filter = curry(_filter);
const reduce = curryForReduce(_reduce);

export { map, filter, reduce, run }

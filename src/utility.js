const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const curryForReduce = (fn) => (par1, par2) => (par3) => fn(par1, par2, par3);

const curry = fn => {
    let arity = fn.length;
    return (...args) => {
        let firstArgs = args.length;
        if (firstArgs >= arity) {
            return fn(...args);
        } else {
            return (...secondArgs) => {
                return fn(...[...args, ...secondArgs]);
            }
        }
    }
}

const partial = (fn, ...preset) => (...later) => fn(...preset, ...later);
const partialRight = (fn, ...preset) => (...later) => fn(...later, ...preset);

export { pipe, compose, curryForReduce, curry, partial, partialRight }

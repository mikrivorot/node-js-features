'use strict'

function syncIteration() {
    const iterable = ['syncValueA', 'syncValueB'];
    const iterator = iterable[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}


async function asyncIteration() {
    const asyncIterable = createAsyncIterable([Promise.resolve('asyncValueA'), Promise.resolve('asyncValueB')]);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    console.log(await asyncIterator.next());
    console.log(await asyncIterator.next());
    console.log(await asyncIterator.next());

    async function* createAsyncIterable(arrayOfPromises) {
        for await (const elem of arrayOfPromises) {
            yield elem;
        }
    }
}

function fibonacciIteration() {
    let fibonacci = {
        * [Symbol.iterator]() {
            let pre = 0, cur = 1
            for (; ;) {
                [pre, cur] = [cur, pre + cur]
                yield cur
            }
        }
    }

    const fibonacciIterator = fibonacci[Symbol.iterator]();
    console.log(fibonacciIterator.next());
    console.log(fibonacciIterator.next());
    console.log(fibonacciIterator.next());
    console.log(fibonacciIterator.next());
}

syncIteration()
/*
{ value: 'syncValueA', done: false }
{ value: 'syncValueB', done: false }
{ value: undefined, done: true }
 */

asyncIteration()
/*
{ value: 'asyncValueA', done: false }
{ value: 'asyncValueB', done: false }
{ value: undefined, done: true }
 */

fibonacciIteration();
/*
Is it fibonacci?
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 5, done: false }
 */

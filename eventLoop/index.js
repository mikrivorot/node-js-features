// Before the execution of the, nodejs just parse the code 
// and sort all async operations to different phases and queues of Event Loop

const fs = require('fs');
console.log('START'); // not related to evemt loop, #1

setTimeout(() => console.log('setTimeout 1'), 0); // 'timer' queue, #6. Note: in case of value greate of 0, console.log will be executed later, but added to the phase before setTimeout 2
setImmediate(() => console.log('setImmediate')); // 'check' queue, #8

fs.readFile(__filename, () => { // poll, but as 'check' phase is not, 'setImmediate' will be executed first
    // event loop goes inside 'poll', sort call to phases/queues, go out.
    // after 'poll' it is time for 'nextTick' -> 'other microtasks' -> check -> 'nextTick' -> 'other microtasks' -> close callbacks ...
    setTimeout(() => console.log('readFile setTimeout'), 0); // 'timer' queue, #11
    setImmediate(() => console.log('readFile setImmediate')); // 'check' queue, #10
    process.nextTick(() => console.log('readFile Next Tick')) // nextTick' priority queue, #9
})

Promise.resolve() // 'other microtasks' priority queue
    .then(() => {
        console.log('Promise'); // #4
        process.nextTick(() => console.log('Promise Next Tick')) // 'nextTick' priority queue, but after Promise. #5
    })


process.nextTick(() => console.log('Next Tick')); // 'nextTick' priority queue #3
setTimeout(() => console.log('setTimeout 2'), 0); // 'timer' queue, #7

console.log('END'); // not related to evemt loop, #2

/*
node index.js 

START
END
Next Tick
Promise
Promise Next Tick
setTimeout 1
setTimeout 2
setImmediate
readFile Next Tick
readFile setImmediate
readFile setTimeout
 */
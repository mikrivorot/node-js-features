const {  parentPort, workerData } = require('worker_threads');
const sorter = require("./listSort");
parentPort.on('message', (msg) => {
    // We assume that it is the last message
    console.log("Main thread finished on: ", (msg.timeDiff / 1000), " seconds...");
    console.log("Worker will be finished too");
    process.exit(0);
})

console.log('Worker id ' + workerData.id + ', name: '+ workerData.message);

const start = Date.now()
const bigList = Array(1000000).fill().map( (_) => random(1,10000))
parentPort
    .postMessage('Start array sort');
sorter.sort(bigList);
parentPort
    .postMessage(`Big array was sorted, it took ${Date.now() - start} ms, first value in array is ${sorter.firstValue}`);

function random(min, max) {
    return Math.random() * (max - min) + min
}
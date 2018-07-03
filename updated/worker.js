const {  parentPort, workerData } = require('worker_threads');

console.log('Worker id ' + workerData.id + '. And message: '+ workerData.message);

function random(min, max) {
    return Math.random() * (max - min) + min
}

const sorter = require("./list-sorter");

const start = Date.now()
let bigList = Array(1000000).fill().map( (_) => random(1,10000))

/**
 //вот как получить сообщение из главного потока:
 parentPort.on('message', (msg) => {
    console.log("Main thread finished on: ", (msg.timeDiff / 1000), " seconds...");
})
 */

sorter.sort(bigList);
parentPort.postMessage({ val: sorter.firstValue, timeDiff: Date.now() - start});
process.exit(9);
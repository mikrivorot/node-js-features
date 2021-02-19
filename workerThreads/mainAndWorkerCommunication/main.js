const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const request = require('request');

// Notify that it is Main Thread
console.log('This is Main Thread');

function startWorker(path, cb) {
    let worker = new Worker(path, {workerData: {message: 'baby worker', id: 1}});

    // Listen messages from worker itself
    worker.on('message', (msg) => {
        // Worker can emit message. Messages can be handled here
        // cb(null, msg); - send worker message to cd function in startWorker
        // You can call cd as much as required
    });

    // Listen errors
    worker.on('error', cb);

    // Listen if worker is stopped
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(new Error('Worker stopped with code ' + code));
        } else {
            console.log('Worker successfully stopped with code ' + 0);
        }
    });

    return worker;
}

const myWorker = startWorker(__dirname + '/worker.js', (err, result) => {
    if(err) return console.error(err);
    // You can handle any messages from worker here (result param)
})
myWorker.on('message', (message) => {
    console.log(`Message from worker: ${message}`);
});

console.log('Worker is created');

const start = Date.now();
request.get('http://www.google.com', (err, resp) => {
    if(err) {
        console.error(err);
    }
    myWorker.postMessage({finished: true, timeDiff: Date.now() - start}); // send message to worker
})


/*
This is Main Thread
Worker is created
Worker id 1, name: baby worker
Message from worker: Start array sort
Message from worker: Big array was sorted, it took 3984 ms, first value in array is 1.009491547656603
Main thread finished on:  3.635  seconds...
Worker successfully stopped with code 0
 */
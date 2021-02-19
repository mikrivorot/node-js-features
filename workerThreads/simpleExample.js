const { Worker, isMainThread, workerData } = require('worker_threads');

if(isMainThread) {
    console.log("This is the Main Thread")
    for (let i = 0; i < 2; i++) {
        let w = new Worker(__filename, {workerData: `Worker index = ${i}`});
    }
} else {
    console.log(`This is a worker with data: ${workerData}`);
}

/*
Console output:
This is the Main Thread
This is a worker with data: Worker index = 0
This is a worker with data: Worker index = 1
 */
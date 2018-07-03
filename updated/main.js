const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const request = require('request');

// Notify that it is Main Thread
console.log('This is Main Thread');

function startWorker(path, cb) {
    let worker  = new Worker(path, {workerData: {someInfo: 'haha', id: null}});

    // Listen messages
    worker.on('message', (msg) => {
        cb(null, msg);
    });

    // Listen errors
    worker.on('error', cb);

    // Listen if worker is stopped
    worker.on('exit', (code)=>{
        if(code !== 0){
            console.error(new Error('Worker ' + workerData.id + ' stopped with code ' + code));
        }
    });

    return worker;
}


let myWorker = startWorker(__dirname + '/worker.js', (err, result) => {
    if(err) return console.error(err);
    console.log("[[Heavy computation function finished]]")
    console.log("First value is: ", result.val);
    console.log("Took: ", (result.timeDiff / 1000), " seconds");
})

console.log('Worker is created');

const start = Date.now();
request.get('http://www.google.com', (err, resp) => {
    if(err) {
        return console.error(err);
    }

    console.log("Message from main: Total bytes received: ", resp.body.length);
    //myWorker.postMessage({finished: true, timeDiff: Date.now() - start}) //так можно отправлять сообщения воркеру
})

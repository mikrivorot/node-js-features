const { EventEmitter } = require('events');
const { firstListener, errorListener} = require('./listener');
const server = new EventEmitter();

console.log('error');

// server
server.addListener('data', firstListener);
server.on('error',errorListener);
server.emit('data', 'event "data" emitted');
server.emit('error');


var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', () => {
    console.log('connected');
    socket.emit('SENSORS_CONNECTION', true);

    socket.emit('SERVER_SOCK', {data: "Hello"});
});
socket.on('disconnect', () => {
    console.log('disconnected');
 });
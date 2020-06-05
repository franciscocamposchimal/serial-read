const socket = require('socket.io-client')('http://localhost:3000');
const moment = require('moment');

function pRandVal() {
	return Math.floor(Math.random() * (500 - 1 + 1) + 1);
}

function tRandVal() {
	return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

socket.on('connect', () => {
	console.log('connected');
	socket.emit('SENSORS_CONNECTION', true);

	setInterval(() => {
		const data = {
			date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
			sensorsP: [
				{ name: 's5', type: 'p', val: pRandVal() },
				{ name: 's6', type: 'p', val: pRandVal() },
				{ name: 's7', type: 'p', val: pRandVal() }
			],
			sensorsT: [
				{ name: 's1', type: 't', val: tRandVal() },
				{ name: 's2', type: 't', val: tRandVal() },
				{ name: 's3', type: 't', val: tRandVal() },
				{ name: 's4', type: 't', val: tRandVal() }
			]
		};
		socket.emit('SERVER_SOCK', data);
	}, 1000);
});
socket.on('disconnect', () => {
	console.log('disconnected');
});

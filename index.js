const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;
const socket = require('socket.io-client')('https://argosback.arido.dev'); // ('http://localhost:3000');
// const moment = require('moment-timezone');

let bufferData = '';

function logData(data, socket) {
	bufferData += data.toString('utf8');
	if (bufferData.includes('\n')) {
		bufferData.split('\n');
		try {
			bufferData = bufferData.split('|');
			bufferData.slice(0,6);
			//bufferData = bufferData.filter((e) => e !== '\r\n' || e !== '\r\n\r' || e !== '\n');
			console.log(bufferData);
			if (bufferData.length > 0) {
				const [ date, p1, p2, p3, t1, t2, t3 ] = bufferData;
				const data = {
					date,
					sensorsP: [
						{ name: 's4', type: 'p', val: p1 },
						{ name: 's5', type: 'p', val: p2 },
						{ name: 's6', type: 'p', val: p3 }
					],
					sensorsT: [
						{ name: 's1', type: 't', val: t1 },
						{ name: 's2', type: 't', val: t2 },
						{ name: 's3', type: 't', val: t3 }
					]
				};
				socket.emit('SERVER_SOCK', data);
				// console.log('DATOS: ', data);
				// return data;
			}
			// const obj = JSON.parse(bufferData);
			// console.log('DATA typeof: ', typeof obj);
			// console.log('DATA BUFFER: ', obj);
		} catch (error) {
			console.log('ERROR');
			// return { message: 'PARSE ERROR...' };
		}
		bufferData = '';
	}
}

socket.on('connect', () => {
	console.log('connected');
	socket.emit('SENSORS_CONNECTION', true);
	raspi.init(() => {
		var serial = new Serial({ portId: '/dev/ttyS0', baudRate: 9600 });
		serial.open(() => {
			serial.on('data', (data) => {
				// process.stdout.write(data);
				// const sensorsData = logData(data);
				logData(data, socket);
				//socket.emit('SERVER_SOCK', sensorsData);
			});
			// serial.write('Hello from raspi-serial');
		});
	});
});
socket.on('disconnect', () => {
	console.log('disconnected');
});

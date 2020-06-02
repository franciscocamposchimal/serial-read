const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

let bufferData= '';

function logData(data){
   bufferData += data.toString('utf8');
   if(bufferData.includes('\n')){
       bufferData.split('\n');
       try {
           const obj = JSON.parse(bufferData);
           console.log('DATA typeof: ', typeof obj);
           console.log('DATA BUFFER: ', obj);
       } catch (error) {
           console.log('ERROR');
       }
       bufferData  = '';
   }
};

raspi.init(() => {
  var serial = new Serial({portId: "/dev/ttyS0", baudRate: 9600});
  serial.open(() => {
    serial.on('data', (data) => {
        // process.stdout.write(data);
        logData(data);
    });
    // serial.write('Hello from raspi-serial');
  });
});
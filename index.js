const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

let bufferData= '';

function logData(data){
   bufferData += data.toString('utf8');
   if(bufferData.includes('\r\n')){
       bufferData.split('\r\n');
       try {
	  bufferData = bufferData.split('|');
	  bufferData = bufferData.filter(e=>e!=='\r\n');
if(bufferData.length > 0){
}	  
const [date,p1,p2,p3,t1,t2,t3] = bufferData;
	  const data = {
 	  date,
	  sensorsP:[
		{ name: 's4', type: 'p', val: p1 },
		{ name: 's5', type: 'p', val: p2 },
		{ name: 's6', type: 'p', val: p3 },
	  ],
          sensorsT:[
                { name: 's1', type: 't', val: t1 }, 
                { name: 's2', type: 't', val: t2 },
                { name: 's3', type: 't', val: t3 },
          ],
	  };
	  console.log("DATOS: ", bufferData);
           // const obj = JSON.parse(bufferData);
           // console.log('DATA typeof: ', typeof obj);
           // console.log('DATA BUFFER: ', obj);
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

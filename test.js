var Keyboard = require('./src/index');

var k = new Keyboard('event0'); // 'event0' is the file corresponding to my keyboard in /dev/input/
k.on('keyup', console.log);
k.on('keydown', console.log);
k.on('keypress', console.log);
k.on('error', console.error);
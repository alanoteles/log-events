const logEvents = require('./logEvents');

const EventEmitter = require('events');
const axios = require('axios');

class LogEventEmitter extends EventEmitter { }; 

const logEventEmitter = new LogEventEmitter();

logEventEmitter.on('log', (msg) => logEvents(msg));

setTimeout(async () => {
    
    try {
        const response = await axios.get('https://www.7timer.info/bin/astro.php?lon=47.8919&lat=15.7975&ac=0&unit=metric&output=json&tzshift=0');
        console.log(response.data);
        logEventEmitter.emit('log', 'API call returned results succesfuly!');

    } catch (error) {
        if (error.code === 'ENOTFOUND') {
            logEventEmitter.emit('log', 'Error: Could not find the API server.');
            console.error('Error: Could not find the server.');
            
        } else {
            console.error('Another error happened:', error.message);
            logEventEmitter.emit('log', error.message);
        }
    }

}, 2000);
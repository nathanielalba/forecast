var connect = require('./connector.js');
var city = parseInt(process.argv.slice(2));
connect.lookup(city);
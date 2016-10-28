require('babel-register')({presets: [ 'es2016' ]});
require("babel-polyfill");

//var app = require('./serverExpress');
var app = require('./server');


app.default.listen(3000, function(){
    console.log('Server start on:', 3000);
});


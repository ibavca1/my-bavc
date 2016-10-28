var os = require('os');
var co = require('co');
var async = require('async');
var mssql = require('co-mssql');
var promise = require('bluebird');
var http = require('http');
var EntitiesXML = require('html-entities').XmlEntities;
var EntitiesHTML = require('html-entities').AllHtmlEntities;

var entitiesXML = new EntitiesXML();
var entitiesHTML = new EntitiesHTML();

var config = {
    user: 'cluster',
    password: 'lilo0',
    server: 's0083',
    database: 'WHS',
    options: {
	encrypt: true,
  connectionTimeout: 30000
    }
};

module.exports.runTask = co.wrap(function *(task){
    var r = yield co(function *(){
    var res = yield Promise.resolve(true);
    return res;
  }).then(function(data){
    var stringParam = task.jobName + '&';
    return new promise(function(resolve, reject){
      async.eachOfLimit(task.jobParams, 1, function(value, key, cb){
          stringParam += key+'='+value+'&';
          async.setImmediate(cb)
      }, function(){
        resolve(stringParam);
      });
    });
}).then(function(data){
    var options = {
      hostname: 'S0083',
      port: 9080,
      path: '/kettle/runJob/?job=/' + data,
      method: 'GET',
      auth: 'cluster:cluster'
    };
    return options
  }).then(function(data){
    return new promise(function(resolve, reject){
      var req = http.request(data,(res)=>{
        var result = '';
        res.on('data', function(chunk){
          result += chunk
          })
        res.on('end', function(){
          resolve(result);
        })
      });
      req.end();
    });
  }).then(function(data){
    return data;
  });
  return entitiesXML.decode(entitiesHTML.decode(r));
});

module.exports.execQuery = co.wrap(function *(query){
    connection = new mssql.Connection(config);
    yield connection.connect();
    var request = new mssql.Request(connection);
    var recordset = yield request.query(query);
    return recordset;
});

module.exports.getIp = function getIp(){
  var ip = null;
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      ip = iface.address;
    });
  });
  return ip;
}

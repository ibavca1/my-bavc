import os from 'os';
import co from 'co';
import mssql from 'co-mssql';
import {XmlEntities} from 'html-entities';
import {AllHtmlEntities} from 'html-entities';

const entitiesXML = XmlEntities();
const entitiesHTML = AllHtmlEntities();

const config = {
    user: 'cluster',
    password: 'lilo0',
    server: 's0083',
    database: 'WHS',
    options: {
	encrypt: true,
  connectionTimeout: 30000
    }
}

/*

export function runTask(){
    co.wrap(function *(task){
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
}

export function execQuery(){
    co.wrap(function *(query){
    connection = new mssql.Connection(config);
    yield connection.connect();
    var request = new mssql.Request(connection);
    var recordset = yield request.query(query);
    );
    return recordset;
}
*/
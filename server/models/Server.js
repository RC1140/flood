'use strict';

let diskspace = require('diskusage');
let diskinfo = require('diskinfo');

class Server {
  constructor() {
    this.ready = false;
  }


  getDiskUsageStats(callback){
      diskinfo.getDrives(function(err, aDrives) {
          var promiseList = [];
          for (var i = 0; i < aDrives.length; i++) {
              var fs = aDrives[i].mounted;
              var pDiskCheck = new Promise((resolve,reject) => {
                  diskspace.check(fs,function(err,results){
                      resolve({
                          'mountPoint':fs,
                          'details':results
                      });
                  });
              });
              promiseList.push(pDiskCheck);
          };
          Promise.all(promiseList).then(values => {
              callback(values.sort((a,b) => a.mountPoint.length - b.mountPoint.length));
          });
      });
    }
}


module.exports = new Server();

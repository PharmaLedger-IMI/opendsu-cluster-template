global.clusterlogger = require('./logger/logger');
global.targetcluster = "none";

function deployCluster(callback) {
    require('./cluster').deployCluster((err) => {
        if (err) {
            clusterlogger.log(err);
            return callback(err);
        }
        clusterlogger.log('200OK');
        callback(undefined);
    });
}



function init(){
    const myargs = process.argv.slice(2);
    try {
        targetcluster = myargs[0];
        clusterlogger.log("Deploying configuration on cluster : ", targetcluster);
    }
    catch (e) {
        clusterlogger.log(e);
        clusterlogger.close();
        return;
    }
    require('./util/connect').connect();
    //const operation = 'apply';
    //const operation = 'delete'
    deployCluster((err) => {
        clusterlogger.close();
    })
}

init();
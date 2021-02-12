global.clusterlogger = require('./logger/logger');
global.targetcluster = "none";

function deployCluster(callback) {
    require('./cluster').deployCluster((err) => {
        if (err) {
            clusterlogger.log(err);
            clusterlogger.log('Deploy Cluster ended : 500ERROR');
            return callback(err);
        }
        clusterlogger.log('Deploy Cluster ended : 200OK',);
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

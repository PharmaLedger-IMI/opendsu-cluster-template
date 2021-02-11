let logfile
function startLogger(){
    logfile = require('fs').openSync('./logs.txt','as+')
}

function log(message){
    if (logfile === undefined)
    {
        startLogger();
    }
    require('fs').appendFileSync(logfile,message+'\r\n','utf8');
}


function closeLogger(){
    if (logfile !== undefined)
    {
        require('fs').closeSync(logfile);
    }
}


module.exports = {
    log,
    closeLogger
}
global.logfile = undefined;

function startLogger(){
    if (logfile === undefined) {
        const txtfile = './logs.txt';
        const fs = require('fs');
        if (fs.existsSync(txtfile))
        {
            fs.unlinkSync(txtfile);
        }
        global.logfile = fs.openSync(txtfile, 'as+')
    }
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

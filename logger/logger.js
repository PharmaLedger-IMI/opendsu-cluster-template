function log(message, arg){
    let msg = message;
    if (arg)
    {
        msg = msg + arg;
    }
    require('./loggerfile').log(msg);
    console.log(msg);
}

function close(){
    require('./loggerfile').closeLogger();
}

module.exports = {
    log,
    close
}
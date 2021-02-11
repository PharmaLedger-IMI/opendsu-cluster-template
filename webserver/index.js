function deployWebAPI(){
    const express = require('express');
    const port = process.env.PORT === undefined ? 3000 : process.env.PORT;

    const webServer = express();

    configureHeaders(webServer);
    configureEntryPoints(webServer);

    webServer.listen(port);
    console.log('Listening to port ', port);
}

function configureEntryPoints(webServer)
{
    const responseMiddleware = require('./utils').responseModifierMiddleware;
    webServer.use("/cluster/*",responseMiddleware);

    const requestMiddleware = require('./utils').requestBodyJSONMiddleware;

    const getServices = require("./controllers/getServices").getServices;
    webServer.post("/cluster/getServices", requestMiddleware);
    webServer.post("/cluster/getServices", getServices);

    const deployConfiguration = require('./controllers/deployConfiguration').deployConfiguration;
    webServer.post("/cluster/deployConfiguration", requestMiddleware);
    webServer.post("/cluster/deployConfiguration", deployConfiguration);
}

function configureHeaders(webServer) {
    webServer.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Content-Length, X-Content-Length');
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Content-Length, X-Content-Length');
        next();
    });

}


module.exports = {
    deployWebAPI
}
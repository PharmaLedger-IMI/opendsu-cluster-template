function deployConfiguration(request, response, next){
    require('../../cluster').deployCluster((err) => {
        if (err)
        {
            return response.send(500, err.toString());
        }
        return response.send(200);
    });
}


module.exports = {
    deployConfiguration
}
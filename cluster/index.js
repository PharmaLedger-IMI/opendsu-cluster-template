
function deployCluster(callback)
{
    require('../phases/quorum').deployQuorum((err) => {
        if (err){
            clusterlogger.log(err);
            return callback(err);
        }
        require('../phases/AnchorSmartContract').applyAnchoringContract((err) => {
            if (err)
            {
                clusterlogger.log(err);
                return callback(err);
            }
            require('../phases/EthereumApiAdapter').applyEthereumApiAdapter((err) => {
                if (err)
                {
                    clusterlogger.log(err);
                    return callback(err);
                }
                return callback(undefined);
            })
        })

    })
}


module.exports = {
    deployCluster
}

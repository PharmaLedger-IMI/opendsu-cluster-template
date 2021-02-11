function applyEthereumApiAdapter(callback)
{
    const k8Configuration = require('../util/connect').connect();

    require('../util/services').getServiceByName(k8Configuration, 'quorum-node2',(err, qn2Service) =>{
        if (err)
        {
            return clusterlogger.log(err);
        }
        require('../util/services').getServiceByName(k8Configuration,'anchorsmart-service', (err, scService) => {
            if (err)
            {
                return clusterlogger.log(err);
            }
            const kubeApplyFile = require('../util/applyFile').applyFile;
            require('../util/template/EthereumApiAdapter').updateConfigMap(qn2Service.clusterIP, scService.clusterIP);
            kubeApplyFile('./K8/EthereumApiAdapter/apiadapter-configmap.yaml', (err) =>{
                if (err)
                {
                    return clusterlogger.log(err);
                }
                kubeApplyFile('./K8/EthereumApiAdapter/ApiAdapter.yaml',(err) =>{
                    if (err)
                    {
                        return clusterlogger.log(err);
                    }
                    const k8config = require('../util/connect').connect();
                    require('../util/getpods').waitForAllThePodsToBeOnline(k8config,10, (err) =>{
                            if (err)
                            {
                                return callback(err);
                            }
                            return callback(undefined);
                        }
                    )
                })
            });

        });


    })
}


module.exports = {
    applyEthereumApiAdapter
}
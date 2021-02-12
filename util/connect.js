function connect(){
    let useDefaultKubectlConfig = false;
    let kubeConfig;

    //check if we have custom config
    const fs = require('fs');
    const pathToConfigFile = './K8/.kube/config';
    if (fs.existsSync(pathToConfigFile))
    {
        kubeConfig = fs.readFileSync(pathToConfigFile);
        useDefaultKubectlConfig = false;
    }
    if (typeof kubeConfig === 'undefined')
    {
        console.log('Using current kubectl context ...');
        useDefaultKubectlConfig = true;
    }
    const k8s = require('@kubernetes/client-node');
    let kc;
    if (useDefaultKubectlConfig)
    {
        kc = new k8s.KubeConfig();
        kc.loadFromDefault();
    }
    else {
        kc = new k8s.KubeConfig();
        kc.loadFromString(kubeConfig);
    }
    changeContext(kc);

    clusterlogger.log('kube context: ',kc.currentContext)

    return kc;
}


function changeContext(kubeConfig){

    // locate the context based on cluster
    const currentContext = kubeConfig.currentContext;
    //check if current context is for the requested cluster
    //if no, change to the new context
    if (currentContext.indexOf(targetcluster) > 1)
    {
        clusterlogger.log('current context is already set.', currentContext);
    } else {
        for(const context of kubeConfig.getContexts())
        {
            if (context.name.indexOf(targetcluster) > 1)
            {
                clusterlogger.log('Change context to :', context.name);
                kubeConfig.setCurrentContext(context.name);
            }
        }
    }
}

module.exports = {
    connect
};

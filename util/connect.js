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

    console.log('kube context: ',kc.currentContext)
    /*
    const yaml = require("js-yaml");
    const kubeContent = yaml.load(kubeConfig);

    // locate the context based on cluster
    const currentContext = kubeContent['current-context'];
    //check if current context is for the requested cluster
    //if no, change to the new context
    if (currentContext.indexOf(targetcluster) > 1)
    {
        console.log('current context is already set.', currentContext);
    } else {
        for(const c of kubeContent.contexts)
        {
            if (c.name.indexOf(targetcluster) > 1)
            {
                console.log('we should change to :', c);
                kubeContent['current-context'] = c.name;
            }
        }
    }
    kc = new k8s.KubeConfig();
    kc.loadFromOptions({
        clusters : kubeContent.clusters,
        contexts: kubeContent.contexts,
        users : kubeContent.users,
        currentContext : kubeContent.currentContext
    });


    //use the LoadFromOptions method and pass updated json objects
    //console.log('available contexts', kubeContent.contexts);
    //console.log("available clusters : ",kubeContent.clusters);
    //console.log("current context : ", kubeContent['current-context']);
   // console.log("1st cluster : ",kubeContent.clusters[0].name);

   // clusterlogger.log('Context should be changed on : ',targetcluster);

     */
    return kc;
}


function changeContext(kubeConfig){

    // locate the context based on cluster
    const currentContext = kubeConfig.currentContext;
    //check if current context is for the requested cluster
    //if no, change to the new context
    if (currentContext.indexOf(targetcluster) > 1)
    {
        console.log('current context is already set.', currentContext);
    } else {
        for(const context of kubeConfig.getContexts())
        {
            if (context.name.indexOf(targetcluster) > 1)
            {
                console.log('Change context to :', context);
                kubeConfig.setCurrentContext(context.name);
            }
        }
    }
}

module.exports = {
    connect
};
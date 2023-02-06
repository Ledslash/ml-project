const ENV = require(`../environment/environment.${process.env.ENVIRONMENT}`);

export const config: any = {
    ...ENV,
    ...{ isLocal: process.env.ENVIRONMENT === 'local' }
}
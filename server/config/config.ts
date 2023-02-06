const ENV = require(`../envs/envs.${process.env.ENVIRONMENT}`);

export const config: any = {
    ...ENV,
    ...{ isLocal: process.env.ENVIRONMENT === 'local' }
}
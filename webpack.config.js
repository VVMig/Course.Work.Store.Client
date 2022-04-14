/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = function (env) {
    if (!env) {
        throw new Error('No flag');
    }

    const envConfig = require(`./webpack.config.${env.env}.js`);

    const mergedConfig = merge(common(env.BASE_URL), envConfig);

    return mergedConfig;
};

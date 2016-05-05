/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;
var client = new TopClient({
    'appkey': '23346522',
    'appsecret': '1e8d2ad60aca22aa4ec1b39f5f937bfe',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

module.exports = client;

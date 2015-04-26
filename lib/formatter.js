var _ = require('lodash');
var URL = require('url');

module.exports = function(app) {
  return function formatter(options) {
    return URL.format(_.extend({
      protocol: 'http',
      host: app.config.host,
    }, options))
  }
}

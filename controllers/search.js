var cheerio = require('cheerio');
var request = require('request');

module.exports = function(app) {
  return {
    show: function(req, res, next) {
      if (req.xhr) {
        return res.send(200);
      }
      return res.render('default');
    },
    auto: function(req, res, next) {
      var formatter = require('../lib/formatter')(app);
      var keyword = req.param('keyword');
      var json = {};
      var url = formatter({
        pathname: 'bsearch.php',
        query: {
          term: keyword
        }
      });
      request({
        url: url,
      }, function(err, resp, json) {
        if (err || resp.statusCode !== 200) {
          return res.send(200, err);
        }
        return res.send(200, json);
      });
    },
    action: function(req, res, next) {
      if (req.xhr) {
        return res.send(200);
      }
    }
  }
};
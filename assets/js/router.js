var $ = require('jquery');
var Backbone = require('backbone');

// views
var HomeView = require('./views/search');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home: function() {
    var homeView = new HomeView();
  }
});
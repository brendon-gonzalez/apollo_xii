var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

// Components
var SearchBar = require('./components/search_bar.jsx');

module.exports = Backbone.View.extend({
  el: '.container .main-app',
  template: '<div id="search"></div>',
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template);
    React.render(<SearchBar />, this.$('#search').get(0));
    return this;
  }
});
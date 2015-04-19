var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

// Components
var SearchBar = require('./components/search_bar.jsx');

module.exports = Backbone.View.extend({
  el: 'body',
  template: '<div class="widget-container"></div>',
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template);
    React.render(<SearchBar />, this.$('.widget-container').get(0));
    return this;
  }
});
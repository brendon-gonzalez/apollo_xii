var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var Router = require('./router');
var router = new Router();

Backbone.$ = $;
Backbone.history.start();
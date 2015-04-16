exports.registerRoutes = function(app) {
  var search = require('./controllers/search')(app);

  app.route('/')
    .get(search.show);

  app.route('/search')
    .get(search.show);
};

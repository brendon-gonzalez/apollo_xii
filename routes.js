exports.registerRoutes = function(app) {
  var search = require('./controllers/search')(app);

  app.route('/')
    .get(search.show);

  app.route('/search')
    .get(search.show);

  app.route('/auto_suggest/:keyword')
    .get(search.auto);
};

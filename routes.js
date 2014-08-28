exports.registerRoutes = function(app) {
  var index = require('./controllers/index')(app);

  app.route('/')
    .get(index.index);
};

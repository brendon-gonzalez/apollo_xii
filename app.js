var express = require('express');
var http = require('http');
var exphbs = require('express-handlebars');
var path = require('path');
var routes = require('./routes');

var app = express();

var opts = require('nomnom')
  .option('sock', {
    abbr: 's',
    help: 'A Socket'
  })
  .parse();

app.set('port', process.env.PORT || 3000);
app.set('socket', process.env.PORT || opts.sock);
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'build')));

routes.registerRoutes(app);

if (app.get('socket')) {
  try {
    require('fs').unlinkSync(app.get('socket'));
  } catch(err) {
    if (err.code !== 'ENOENT') {
      console.warn(err);
    }
  }
}

http.createServer(app).listen(app.get('socket') || app.get('port'), '0.0.0.0', function() {
  console.log('Express server listening on port ' + (app.get('socket') || app.get('port')));
});

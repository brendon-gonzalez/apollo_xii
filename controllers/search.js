module.exports = function(app) {
  return {
    show: function(req, res, next) {
      if (req.xhr) {
        return res.send(200);
      }
      return res.render('search');
    },
    action: function(req, res, next) {
      if (req.xhr) {
        return res.send(200);
      }
    }
  }
};
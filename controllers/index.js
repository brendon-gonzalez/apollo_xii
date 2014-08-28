module.exports = function() {
  return {
    index: function(req, res) {
      return res.render('home');
    }
  };
};

var React = require('react');
var AutoSuggest = require('./auto_suggest.jsx');

module.exports = React.createClass({
  handleChange: function() {

  },
  render: function() {
    return (
      <form>
        <input type="search" className="u-full-width" placeholder="Discover" onChange={this.handleChange}  />
        <button type="submit">Dig</button>
      </form>
    );
  }
});
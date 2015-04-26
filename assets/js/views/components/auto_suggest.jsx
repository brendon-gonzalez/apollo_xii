var React = require('react');
// Private class for autosuggest
var AutoSuggestItem = React.createClass({
  render: function() {
    return (
      <li>LOL</li>
    );
  }
})

module.exports = React.createClass({
  render: function() {
    var suggestedItems = this.props.data.map(function() {
      return (
        <AutoSuggestItem   />
      );
    });
    return (
      <ul>
        {suggestedItems}
      </ul>
    );
  }
});


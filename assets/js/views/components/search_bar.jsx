var $ = require('jquery');
var React = require('react');
var timer = null;

module.exports = React.createClass({
  handleSuggestion: function(e) {
    var keyword = e.target.value;
    var scope = this;
    if (keyword.length > 3) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        $.ajax({
          url: '/auto_suggest/' + keyword
        })
        .done(function(data) {
          this.setState({keywords: data});
          this.setState({hasAuto: true});
        }.bind(scope));
      }, 50);
    }
  },
  getInitialState: function() {
    return {
      hasAuto: false
    }
  },
  render: function() {
    return (
      <div className="search-form">
        <AutoSuggestForm onSuggest={this.handleSuggestion} />
        {(this.state.hasAuto) ? <AutoSuggestItems keywords={this.state.keywords} /> : ''}
      </div>
    );
  }
});

var AutoSuggestForm = React.createClass({
  render: function () {
    return (
      <form>
        <input type="search" className="u-full-width" placeholder="Discover" ref="keyword" onChange={this.props.onSuggest}  />
        <button type="submit">Dig</button>
      </form>
    );
  }
});

var AutoSuggestItems = React.createClass({
  render: function() {
    var suggestedItems = this.props.keywords.map(function(keyword, i) {
      return (
        <li key={i}>{keyword}</li>
      );
    });
    return (
      <ul className="auto-complete">
        {suggestedItems}
      </ul>
    );
  }
});


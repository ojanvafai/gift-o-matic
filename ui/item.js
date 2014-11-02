var Item = React.createClass({
  render: function() {
    var containerStyle = {
      display: "flex",
    };
    return (
      <div style={containerStyle}>
        <div>{this.props.data.owner}</div>
      </div>
    );
  }
});

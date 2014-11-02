var Item = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(event) {
    this.setState({expanded: !this.state.expanded});
  },
  render: function() {
    var detailsStyle = {
      display: this.state.expanded ? 'block' : 'none',
    };
    var detailsText = this.state.expanded ? '▼' : '▶';

    return (
      <div className="item">
        <div className="expandButton" onClick={this.handleClick}>{detailsText}</div>
        <div className="itemContent">
          <div className="row">
            <div className="owner">{this.props.data.owner}</div>
            <div className="title">{this.props.data.title}</div>
            <div className="description">{this.props.data.description}</div>
          </div>

          <div className="details" style={detailsStyle}>
            <div className="row">
              <div className="owner">Quantity: {this.props.data.quantityRequested}</div>
              <div className="title">{
                this.props.data.links.map(function(link) {
                  return <div><a href={link}>link</a></div>
                })
              }</div>
              <div className="description">{
                this.props.data.purchasers.map(function(purchaser) {
                  return <div><b>{purchaser.purchaser}</b> is getting {purchaser.quantity}.</div>
                })
              }</div>
            </div>
            <div>{
              this.props.data.photos.map(function(url) {
                return <div><img src={url} /></div>
              })
            }</div>
            <div>{
              this.props.data.comments.map(function(comment) {
                return <div><b>{comment.author}: </b>{comment.comment}</div>
              })
            }</div>
          </div>
        </div>
      </div>
    );
  }
});

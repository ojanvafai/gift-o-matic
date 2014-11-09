var Item = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(event) {
    this.setState({expanded: !this.state.expanded});
  },
  handleEditClick: function(event) {
    this.setState({editing: true});
  },
  handleDeleteClick: function(event) {
    if(confirm('Do you really want to delete?')) {
      // Remove by key
    }
  },
  handleSave: function() {
    this.props.onSaveItem.apply(this, arguments)
    this.setState({editing: false});
  },
  render: function() {
    var detailsStyle = {
      display: this.state.expanded ? 'block' : 'none',
    };
    var detailsText = this.state.expanded ? '▼' : '▶';

    if (!this.state.editing) {
      return (
        <div className="item">
          <div className="expandButton" onClick={this.handleClick}>{detailsText}</div>
          <div className="itemContent">
            <div className="row">
              <div className="owners">{this.props.data.owners.join(' & ')} wants</div>
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
          <div className="editButton" onClick={this.handleEditClick}>✎</div>
          <div className="deleteButton" onClick={this.handleDeleteClick}>☠</div>
        </div>
      );
    }
    else {
      return <ItemForm data={this.props.data} onSaveItem={this.handleSave} />
    }
  }
});

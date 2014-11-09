var Item = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleUnBuy: function(event) {
    var data = new ItemData(this.props.data);
    var currentUser = this.props.users.current_user;

    var existing = data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });
    existing.quantity -= 1;

    if (existing.quantity == 0) {
      data.purchasers.remove(existing);
    }

    this.props.onSaveItem(data);
  },
  handleBuy: function(event) {
    var data = new ItemData(this.props.data);
    var currentUser = this.props.users.current_user;

    var existing = data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      data.purchasers.push({
        purchaser: currentUser,
        quantity: 1,
      });
    }

    this.props.onSaveItem(data);
  },
  handleEdit: function(event) {
    this.setState({editing: true});
  },
  handleDelete: function(event) {
    if(confirm('Do you really want to delete?')) {
      this.props.onDeleteItem(this.props.data.key);
    }
  },
  handleClose: function() {
    this.setState({editing: false});
  },
  handleSave: function(itemData) {
    var data = new ItemData(this.props.data);
    Object.keys(itemData, function(key, value) {
      data[key] = value;
    });
    this.props.onSaveItem(data);
    this.handleClose();
  },
  isFullyPurchased: function() {
    var quantity = this.props.data.quantity;
    var purchasedSoFar = this.props.data.purchasers.reduce(function(a, b) {
      return a + b.quantity;
    }, 0);
    return quantity <= purchasedSoFar;
  },
  currentUserIsBuying: function() {
    var currentUser = this.props.users.current_user;
    return this.props.data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });
  },
  render: function() {
    if (this.state.editing)
      return <ItemForm data={this.props.data} onSaveItem={this.handleSave} onClose={this.handleClose} />

    if (!this.isFullyPurchased())
      var buyButton = <button onClick={this.handleBuy}>$</button>

    if (this.currentUserIsBuying())
      var unBuyButton = <button onClick={this.handleUnBuy}>Ⓧ</button>

    return <div className="item">
        <div className="itemContent">
          <div className="row">
            <div className="recipients">{this.props.data.recipients.join(' & ')} wants</div>
            <div className="description">{this.props.data.description}</div>
            <div className="notes">{this.props.data.notes}</div>
          </div>

          <div className="details">
            <div className="row">
              <div className="owner">Quantity: {this.props.data.quantity}</div>
              <div className="description">{
                this.props.data.links.map(function(link) {
                  return <div><a href={link}>link</a></div>
                })
              }</div>
              <div className="notes">{
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
        {buyButton}
        {unBuyButton}
        <button onClick={this.handleEdit}>✎</button>
        <button onClick={this.handleDelete}>☠</button>
      </div>
  }
});

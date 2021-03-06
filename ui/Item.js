var Item = React.createClass({
  getInitialState: function() {
    return {};
  },
  handlePurchase: function() {
    var data = new ItemData(this.props.data);
    var currentUser = this.props.users.current_user;

    var existing = data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });
    existing.is_purchased = true;

    this.props.onSaveItem(data);
  },
  handleUnPurchase: function() {
    var data = new ItemData(this.props.data);
    var currentUser = this.props.users.current_user;

    var existing = data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });
    existing.is_purchased = false;

    this.props.onSaveItem(data);
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
  handleCopyToCurrentYear: function() {
    var data = new ItemData(this.props.data);

    // Erase the key so it copies instead of moving.
    data.key = null

    var currentUser = this.props.users.current_user;
    data.purchasers = [];

    var date = new Date();
    if (date.getMonth() == 11 && date.getDate() > 24)
      data.created = (date.getFullYear() + 1) + '-1-1'
    else
      data.created = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

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
  currentUserIsBuying: function() {
    var currentUser = this.props.users.current_user;
    return this.props.data.purchasers.find(function(purchaser) {
      return purchaser.purchaser == currentUser;
    });
  },
  render: function() {
    if (this.state.editing)
      return <ItemForm data={this.props.data} onSaveItem={this.handleSave} onClose={this.handleClose} users={this.props.users} />

    var currentUser = this.props.users.current_user;
    var isForCurrentUser = this.props.data.recipients.some(function(recipient) {
      return recipient.toLowerCase() == currentUser.toLowerCase();
    });

    if (!isForCurrentUser) {
      var quantity = this.props.data.quantity;
      var purchasedSoFar = this.props.data.purchasers.reduce(function(a, b) {
        return a + b.quantity;
      }, 0);

      if (!quantity || quantity > purchasedSoFar)
        var buyButton = <button onClick={this.handleBuy} title='purchase'>✓</button>

      if (this.currentUserIsBuying())
        var unBuyButton = <button onClick={this.handleUnBuy} title='unpurchase'>Ⓧ</button>

      var purchasers = this.props.data.purchasers.map(function(purchaser) {
        return <div key={purchaser}>
            <div>{quantity ? quantity - purchasedSoFar : '∞'} left to purchase</div>
            <div><b>{purchaser.purchaser}</b> is getting {purchaser.quantity}.</div>
          </div>
      });
    }

    var deleteButton = <button onClick={this.handleDelete} title='delete'>☠</button>;

    var buttons;
    if (this.props.inShoppingList) {
      buttons = <div className="itemButtons">
        {unBuyButton}
      </div>
    } else if (this.props.showCopyButton) {
      buttons = <div className="itemButtons">
        <button onClick={this.handleCopyToCurrentYear} title='copy to current year'>©</button>
        {deleteButton}
      </div>
    } else {
      buttons = <div className="itemButtons">
        {buyButton}
        {unBuyButton}
        <button onClick={this.handleEdit} title='edit'>✎</button>
        {deleteButton}
      </div>
    }

    return <div className="item">
        {buttons}
        <div className="title">
          {this.props.data.quantity || '∞'} <span dangerouslySetInnerHTML={{__html: linkify(this.props.data.description)}} />
        </div>
        <div>
          <div dangerouslySetInnerHTML={{__html: linkify(this.props.data.notes)}} />
          <div>{purchasers}</div>
          <div>{
            this.props.data.photos.map(function(url) {
              // TODO: This key isn't unique of the same image is included twice.
              return <div key={url}><img src={url} /></div>
            })
          }</div>
          <div>{
            this.props.data.comments.map(function(comment, index) {
              // TODO: This key isn't right if people can delete comments.
              return <div key={index}><b>{comment.author}: </b>{comment.comment}</div>
            })
          }</div>
        </div>
        <br className="clear" />
      </div>
  }
});

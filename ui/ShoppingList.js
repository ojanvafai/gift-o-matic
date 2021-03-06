var currentYear = new Date().getFullYear();

function getPurchasesForUser(user, data) {
  var purchases = {};
  if (!data)
    return purchases;

  data.forEach(function(itemData) {
    if (itemData.year != currentYear)
      return;

    var isUsers = itemData.purchasers.find(function(purchaser) {
      return purchaser.purchaser == user;
    });

    if (isUsers) {
      var recipients = itemData.recipients.join(' & ');
      if (!purchases[recipients])
        purchases[recipients] = [];
      purchases[recipients].push(itemData);
    }
  });
  return purchases;
}

var ShoppingList = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleClick: function(event) {
    this.setState({expanded: !this.state.expanded});
  },
  render: function() {
    var detailsText = this.state.expanded ? '▼' : '▶';
    var detailsStyle = {
      display: this.state.expanded ? 'block' : 'none',
    };
    var purchases = getPurchasesForUser(this.props.users.current_user, this.props.data);
    var me = this;

    var list;

    var recipients = Object.keys(purchases);
    if (recipients.length) {
      list = recipients.sort().map(function(user) {
        return (<div key={user}><h3>Purchases for {user}</h3>
          {
            purchases[user].map(function(item) {return (
              <Item key={item.key} data={item} users={me.props.users}
                onSaveItem={me.props.onSaveItem} inShoppingList />
            )})
          }
        </div>)});
    } else {
      list = "You haven't selected any gifts to purchase."
    }

    return <div>
      <div title='View My Shopping List'>
        <h2 onClick={this.handleClick}>{detailsText} My Shopping List</h2>
        <div className='details' style={detailsStyle}>{list}</div>
      </div>
    </div>
  },
});

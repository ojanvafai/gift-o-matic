
function getPurchasesForUser(user, data) {
  var purchases = {};
  if (!data)
    return purchases;

  data.forEach(function(itemData) {
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
    return <div>
      <div onClick={this.handleClick} title='View My Shopping List'>{detailsText} My Shopping List
        <div className='details' style={detailsStyle}>
        {
          Object.keys(purchases).sort().map(function(user) {return <div key={user}>Purchases for {user}
              {
                purchases[user].map(function(item) {return (
                  <Item key={item.key} data={item} users={me.props.users}
                    onSaveItem={me.props.onSaveItem} inShoppingList />
                )})
              }
          </div>})
        }
        </div>
      </div>
    </div>
  },
});

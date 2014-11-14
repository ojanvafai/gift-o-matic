
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
    return (
    <div>	
    <div onClick={this.handleClick} title='View My Shopping List'>{detailsText} My Shopping List
    <div className='details' style={detailsStyle}> 
    {
      Object.keys(purchases).sort().map(function(user) {return <div>Purchases for {user} 
     	<ol>
        {purchases[user].map(function(item) {return <li>{item.description}</li> })}
     	</ol></div>}) 
      }  
      </div>  
    </div>
    </div>
    )
  },
});

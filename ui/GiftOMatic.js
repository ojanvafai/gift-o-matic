var GiftOMatic = React.createClass({
  getInitialState: function() {
    return {};
  },
  processItems: function(response) {
    this.setState({data: response.items.map(function(item) {
      return new ItemData(item);
    })});
  },
  loadDataFromServer: function() {
    // TODO: Merge these into one request.
    net.json('/items').then(this.processItems);
    net.json('/users').then(function(users) {
      this.setState({users: users});
    }.bind(this));
  },
  saveItem: function(itemData) {
    net.ajax({
      method: 'POST',
      url: '/save-item',
      responseType: 'json',
      data: "data=" + encodeURIComponent(JSON.stringify(itemData)),
    }).then(this.processItems);
  },
  // TODO: Reduce code duplication with saveItem
  deleteItem: function(key) {
    net.ajax({
      method: 'POST',
      url: '/delete-item',
      responseType: 'json',
      data: "key=" + encodeURIComponent(key),
    }).then(this.processItems);
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    var fiveMinutes = 5 * 60 * 1000;
    setInterval(this.loadDataFromServer, fiveMinutes);
  },
  render: function() {
    if (!this.state.users)
      return <div />

    if (this.state.users.current_user) {
      var newItemForm = <NewItemForm onSaveItem={this.saveItem} users={this.state.users} />;
      var shoppingList = <ShoppingList data={this.state.data} users={this.state.users} onSaveItem={this.saveItem} />;
      var items = <GroupedItemLists onSaveItem={this.saveItem} onDeleteItem={this.deleteItem} data={this.state.data} users={this.state.users} />;
    } else {
      var newItemForm = 'Please log in';
    }

    return <div>
      <div className="flex">
        <div className="flexOne"></div>
        <Login users={this.state.users} />
      </div>
      {newItemForm}
      {shoppingList}
      <hr/>
      {items}
    </div>;
  },
});

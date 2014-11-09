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
    }).then(this.processItems.bind(this));
  },
  // TODO: Reduce code duplication with saveItem
  deleteItem: function(key) {
    net.ajax({
      method: 'POST',
      url: '/delete-item',
      responseType: 'json',
      data: "key=" + encodeURIComponent(key),
    }).then(this.processItems.bind(this));
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    var fiveMinutes = 5 * 60 * 1000;
    setInterval(this.loadDataFromServer, fiveMinutes);
  },
  render: function() {
    // TODO: Pass this.state.users.list down to ItemForm so that it can have
    // a dropdown of users instead of an input box.
    // console.log(this.state.users && this.state.users.list);
    return <div>
      <div className="flex">
        <div className="flexOne"><NewItemForm onSaveItem={this.saveItem} /></div>
        <Login users={this.state.users} />
      </div>
      <GroupedItemLists onSaveItem={this.saveItem} onDeleteItem={this.deleteItem} data={this.state.data} />
    </div>;
  },
});

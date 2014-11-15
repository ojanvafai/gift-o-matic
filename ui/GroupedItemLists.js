function groupByOwner(data) {
  var groupedData = {};
  if (!data)
    return groupedData;

  data.forEach(function(itemData) {
    var recipients = itemData.recipients.join(' & ');
    if (!groupedData[recipients])
      groupedData[recipients] = [];
    groupedData[recipients].push(itemData);
  });
  return groupedData;
}

var GroupedItemLists = React.createClass({
  getInitialState: function() {
    return {};
  },
  changeGroup: function() {
    this.setState({recipients: this.refs.group.getDOMNode().value});
  },
  render: function() {
    var data = this.props && this.props.data;
    var groupedData = groupByOwner(data);

    var dropdown = <select ref="group" onChange={this.changeGroup}>
      <option value="">Select a recipient</option>
      {
        Object.keys(groupedData).sort().map(function(user) {return <option value={user} key={user}>{user}</option>})
      }
    </select>

    if (this.state.recipients) {
      var list = <ItemList
          onSaveItem={this.props.onSaveItem}
          onDeleteItem={this.props.onDeleteItem}
          data={groupedData[this.state.recipients]}
          users={this.props.users} />
    }
    return <div>View wish list for &nbsp;
      {dropdown}{list}
    </div>;
  }
});

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
  render: function() {
    var data = this.props && this.props.data;
    var groupedData = groupByOwner(data);
    var me = this;
    var itemLists = []
    Object.keys(groupedData, function(key, value) {
      itemLists.push(
        <div className="recipients-list" key={key}>
          <div className="title">List for {key}</div>
          <ItemList onSaveItem={me.props.onSaveItem} onDeleteItem={me.props.onDeleteItem} data={value} users={me.props.users} />
        </div>
      );
    });
    return <div>
      {itemLists}
    </div>;
  }
});

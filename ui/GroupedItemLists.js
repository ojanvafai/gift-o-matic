function groupByOwner(data) {
  var groupedData = {};
  if (!data)
    return groupedData;

  data.forEach(function(itemData) {
    var owners = itemData.owners.join(' & ');
    if (!groupedData[owners])
      groupedData[owners] = [];
    groupedData[owners].push(itemData);
  });
  return groupedData;
}

var GroupedItemLists = React.createClass({
  render: function() {
    var data = this.props && this.props.data;
    var groupedData = groupByOwner(data);

    var itemLists = []
    Object.keys(groupedData, function(key, value) {
      itemLists.push(
        <div className="owners-list">
          <div className="title">List for {key}</div>
          <ItemList data={value} />
        </div>
      );
    });
    return <div>
      {itemLists}
    </div>;
  }
});

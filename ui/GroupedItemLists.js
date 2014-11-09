function groupByOwner(data) {
  var groupedData = {};
  if (!data)
    return groupedData;

  data.forEach(function(itemData) {
    var owner = itemData.owner;
    if (!groupedData[owner])
      groupedData[owner] = [];
    groupedData[owner].push(itemData);
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
        <div className="owner-list">
          <div className="title">List for {key}</div>
          <ItemList data={value} />
        </div>
      );
    });
    return <div>
      {itemLists}
    </div>
  }
});

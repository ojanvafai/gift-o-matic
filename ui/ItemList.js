var ItemList = React.createClass({
  render: function() {
    var me = this;
    return (
      <div>
        {
          this.props.data.map(function(itemData) {
            return (
              <Item onSaveItem={me.props.onSaveItem} onDeleteItem={me.props.onDeleteItem} key={itemData.key} data={itemData} users={me.props.users} />
            );
          })
        }
      </div>
    );
  }
});

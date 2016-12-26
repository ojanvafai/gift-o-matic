var ItemList = React.createClass({
  render: function() {
    var me = this;
    return (
      <div>
        <h2>{this.props.year}</h2>
        {
          this.props.data.sortBy('key').map(function(itemData) {
            return <Item onSaveItem={me.props.onSaveItem}
                  onDeleteItem={me.props.onDeleteItem}
                  key={itemData.key}
                  data={itemData}
                  users={me.props.users} />
          })
        }
      </div>
    );
  }
});

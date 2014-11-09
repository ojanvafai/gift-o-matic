var ItemList = React.createClass({
  render: function() {
    var me = this;
    return (
      <div>
        <div className="header row">
          <div className="owners"></div>
          <div className="title">Item</div>
          <div className="description">Notes</div>
        </div>
        {
          this.props.data.map(function(itemData) {
            return (
              <Item onSaveItem={me.props.onSaveItem} onDeleteItem={me.props.onDeleteItem} key={itemData.key} data={itemData} />
            );
          })
        }
      </div>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    return (
      <div>
        <div className="header row">
          <div className="owner"></div>
          <div className="title">Item</div>
          <div className="description">Notes</div>
        </div>
        {
          this.props.data.map(function(itemData) {
            return (
              <Item key={itemData.key} data={itemData} />
            );
          })
        }
      </div>
    );
  }
});

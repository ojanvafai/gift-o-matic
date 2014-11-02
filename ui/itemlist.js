var ItemList = React.createClass({
  render: function() {
    return (
      <div>
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

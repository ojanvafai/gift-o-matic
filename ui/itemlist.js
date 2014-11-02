var ItemList = React.createClass({
  render: function() {
    var style = {
      width: '100%',
    }
    return (
      <table style={style}>
        <tr>
          <th>owner</th>
          <th>quantityRequested</th>
          <th>title</th>
          <th>description</th>
          <th>links</th>
          <th>photos</th>
          <th>comments</th>
          <th>purchasers</th>
        </tr>
        {
          this.props.data.map(function(itemData) {
            return (
              <Item key={itemData.key} data={itemData} />
            );
          })
        }
      </table>
    );
  }
});

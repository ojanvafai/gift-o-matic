var currentYear = new Date().getFullYear();

var ItemList = React.createClass({
  getInitialState: function() {
    return {pseudoYear: currentYear};
  },
  handleClick: function(event) {
    var newYear = this.state.pseudoYear == this.props.year ? null : this.props.year;
    this.setState({pseudoYear: newYear});
  },
  shouldShowCopyButton: function() {
    if (currentYear != this.props.year)
      return true;

    var date = new Date();
    if (date.getMonth() == 11 && date.getDate() > 24)
      return true;

    return false;
  },
  render: function() {
    var expanded = this.state.pseudoYear == this.props.year;
    var arrow = expanded ? '▼' : '▶';
    var itemsStyle = {
      display: expanded ? 'block' : 'none',
    };

    var me = this;
    return (
      <div>
        <h2 onClick={this.handleClick}>{arrow} {this.props.year}</h2>
        <div style={itemsStyle}>
          {
            this.props.data.sortBy('key').map(function(itemData) {
              return <Item onSaveItem={me.props.onSaveItem}
                    onDeleteItem={me.props.onDeleteItem}
                    key={itemData.key}
                    data={itemData}
                    showCopyButton={me.shouldShowCopyButton()}
                    users={me.props.users} />
            })
          }
        </div>
      </div>
    );
  }
});

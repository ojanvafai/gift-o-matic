var NewItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
  },
  handleSave: function(itemData) {
    this.props.onSaveItem(itemData);
    this.handleClose();
  },
  handleClose: function() {
    this.setState({expanded: false})
  },
  render: function() {
    if (!this.state.expanded) {
      return <button onClick={this.handleOpen} title='Add new item'>+</button>;
    }
    return <ItemForm onSaveItem={this.handleSave} onClose={this.handleClose} users={this.props.users} />
  },
});

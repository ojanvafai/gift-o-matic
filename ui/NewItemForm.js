var NewItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
  },
  handleSave: function() {
    this.props.onSaveItem.apply(this, arguments);
    this.setState({expanded: false})
  },
  render: function() {
    if (!this.state.expanded) {
      return <div onClick={this.handleOpen}>Click here to add a new item</div>;
    }
    return <ItemForm onSaveItem={this.handleSave}/>
  },
});

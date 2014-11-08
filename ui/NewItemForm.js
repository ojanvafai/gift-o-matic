function getValue(ref) {
  return ref.getDOMNode().value.trim();
}

var NewItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
  },
  handleSave: function(event) {
    this.props.onAdd(
        getValue(this.refs.owner),
        getValue(this.refs.quantity),
        getValue(this.refs.title),
        getValue(this.refs.link),
        getValue(this.refs.description));
    this.setState({expanded: false})
  },
  render: function() {
    if (!this.state.expanded) {
      return <div onClick={this.handleOpen}>Click here to add a new item</div>;
    }

    return <div className="newItemForm">
      <div className="newItemFormInputs">
        <div>For: <input ref="owner" /></div>
        <div>Count: <input ref="quantity" /></div>
        <div>Item: <input ref="title" /></div>
      </div>
      <div className="flex">Link: <input className="flexOne" ref="link" /></div>
      <div>Notes: <textarea ref="description" /></div>
      <div><button onClick={this.handleSave}>Save</button></div>
    </div>;
  },
});

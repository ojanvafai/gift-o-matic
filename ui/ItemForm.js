function getValue(ref) {
  return ref.getDOMNode().value.trim();
}

var ItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
  },
  handleSave: function(event) {
    // TODO: Support multiple owners
    this.props.onAdd(
        [getValue(this.refs.owner)],
        getValue(this.refs.quantity),
        getValue(this.refs.title),
        getValue(this.refs.link),
        getValue(this.refs.description));
    this.props.onSave();
  },
  render: function() {
    return <div className="ItemForm">
      <div className="ItemFormInputs">
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

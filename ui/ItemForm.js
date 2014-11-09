function getValue(ref) {
  return ref.getDOMNode().value.trim();
}

var ItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  setValue: function(valStr) {
    if (this.props.data) {
      if (this.props.data[valStr])
        this.refs[valStr].getDOMNode().value = this.props.data[valStr];
    }
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
    this.setValue('recipients');
    this.setValue('quantity');
    this.setValue('description');
    this.setValue('links');
    this.setValue('notes');
  },
  handleSave: function(event) {
    // TODO: Support multiple recipients
    var key = this.props.data && this.props.data.key;
    this.props.onSaveItem({
      key: key,
      recipients: [getValue(this.refs.recipients)],
      quantity: getValue(this.refs.quantity),
      description: getValue(this.refs.description),
      links: [getValue(this.refs.links)],
      notes: getValue(this.refs.notes),
    });
  },
  componentDidMount: function() {
    this.handleOpen();
    this.refs.recipients.getDOMNode().focus();
  },
  render: function() {
    return <div className="ItemForm">
      <div className="ItemFormInputs">
        <div>For: <input ref="recipients"/></div>
        <div>Count: <input ref="quantity" /></div>
        <div>Item: <input ref="description" /></div>
      </div>
      <div className="flex">Link: <input className="flexOne" ref="links" /></div>
      <div>Notes: <textarea ref="notes" /></div>
      <div><button onClick={this.handleSave}>Save</button><button onClick={this.props.onClose}>Cancel</button></div>
    </div>;
  },
});

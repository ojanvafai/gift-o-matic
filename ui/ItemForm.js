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
    this.setValue('owners');
    this.setValue('quantityRequested');
    this.setValue('title');
    this.setValue('link');
    this.setValue('description');
  },
  handleSave: function(event) {
    // TODO: Support multiple owners
    this.props.onSaveItem(
        [getValue(this.refs.owners)],
        getValue(this.refs.quantityRequested),
        getValue(this.refs.title),
        getValue(this.refs.link),
        getValue(this.refs.description));
  },
  componentDidMount: function() {
    this.handleOpen();
    this.refs.owners.getDOMNode().focus();
  },
  render: function() {
    return <div className="ItemForm">
      <div className="ItemFormInputs">
        <div>For: <input ref="owners"/></div>
        <div>Count: <input ref="quantityRequested" /></div>
        <div>Item: <input ref="title" /></div>
      </div>
      <div className="flex">Link: <input className="flexOne" ref="link" /></div>
      <div>Notes: <textarea ref="description" /></div>
      <div><button onClick={this.handleSave}>Save</button></div>
    </div>;
  },
});

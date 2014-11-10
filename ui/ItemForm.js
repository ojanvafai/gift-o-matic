function getValue(ref) {
  return ref.getDOMNode().value.trim();
}

function pushIfNonEmpty(array, ref) {
  var value = getValue(ref);
  if (value)
    array.push(value);
}

var ItemForm = React.createClass({
  getInitialState: function() {
    return {};
  },
  setValue: function(valStr) {
    if (this.props.data[valStr])
      this.refs[valStr].getDOMNode().value = this.props.data[valStr];
  },
  handleOpen: function(event) {
    this.setState({expanded: true});
    if (!this.props.data) {
      this.props.data = { quantity: 1, recipients: [this.props.users.current_user] };
    }

    this.setValue('quantity');
    this.setValue('description');
    this.setValue('notes');

    var recipients = this.props.data.recipients;
    this.refs.recipient1.getDOMNode().value = recipients[0];
    // TODO: Support an arbitrary number of recipients.
    if (recipients.length > 1)
      this.refs.recipient2.getDOMNode().value = recipients[1];
  },
  handleSave: function(event) {
    var key = this.props.data && this.props.data.key;

    var recipients = [];
    pushIfNonEmpty(recipients, this.refs.recipient1);
    pushIfNonEmpty(recipients, this.refs.recipient2);
    recipients.sort();

    this.props.onSaveItem({
      key: key,
      recipients: recipients,
      quantity: getValue(this.refs.quantity),
      description: getValue(this.refs.description),
      notes: getValue(this.refs.notes),
    });
  },
  componentDidMount: function() {
    this.handleOpen();
    this.refs.description.getDOMNode().focus();
  },
  render: function() {
    var usersPlusBlank = ['-'].concat(this.props.users.list)
    return <div className="ItemForm">
      <div className="ItemFormInputs">
        <div>For: <select ref="recipient1">
        {
          usersPlusBlank.map(function(user) {return <option value={user}>{user}</option>})
        }
        </select> &amp; <select ref="recipient2">
        {
          usersPlusBlank.map(function(user) {return <option value={user}>{user}</option>})
        }
        </select></div>
        <div>Count: <input ref="quantity" /></div>
      </div>
      <div className="description"><div>Item: </div><input ref="description" /></div>
      <div>Notes: <textarea ref="notes" /></div>
      <div><button onClick={this.handleSave}>Save</button><button onClick={this.props.onClose}>Cancel</button></div>
    </div>;
  },
});

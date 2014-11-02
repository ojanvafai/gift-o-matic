    // this.key = key;
    // this.quantityRequested = quantityRequested || 0;
    // this.owner = owner || '';
    // this.title = title || '';
    // this.description = description || '';
    // this.links = links || [];
    // this.photos = photos || [];
    // this.comments = comments || [];
    // this.purchasers = purchasers || [];

var Item = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.data.owner}</td>
        <td>{this.props.data.quantityRequested}</td>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.description}</td>
        <td>{
          this.props.data.links.map(function(link) {
            return <div><a href={link}>link</a></div>
          })
        }</td>
        <td>{
          this.props.data.photos.map(function(url) {
            return <div><img src={url} /></div>
          })
        }</td>
        <td>{
          this.props.data.comments.map(function(comment) {
            return <div><b>{comment.author}: </b>{comment.comment}</div>
          })
        }</td>
        <td>{
          this.props.data.purchasers.map(function(purchaser) {
            return <div><b>{purchaser.purchaser}</b> is getting {purchaser.quantity}.</div>
          })
        }</td>
      </tr>
    );
  }
});

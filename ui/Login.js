var Login = React.createClass({
  render: function() {
    if (!this.props.users)
      return <div />;

    var current = this.props.users.current_user;
    if (!current) {
      window.location = this.props.users.login_url;
      return <div />
    }

    return <div>{current} <a href={this.props.users.logout_url}>Sign out</a></div>;
  },
});

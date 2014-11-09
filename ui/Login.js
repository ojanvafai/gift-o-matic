var Login = React.createClass({
  render: function() {
    if (!this.props.users)
      return <div />;

    var current = this.props.users.current_user;
    if (!current)
      return <a href={this.props.users.login_url}>Sign in</a>;

    return <div>{current} <a href={this.props.users.logout_url}>Sign out</a></div>;
  },
});

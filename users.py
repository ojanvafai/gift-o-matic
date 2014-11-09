
import json
import webapp2

from google.appengine.api import users

class Users(webapp2.RequestHandler):
  def get(self):
    result_json = {}

    user = users.get_current_user()

    # TODO: Have the redirect URL actually be the URL you came from.
    result_json['login_url'] = users.create_login_url('/')
    result_json['logout_url'] = users.create_logout_url('/')

    if user:
      result_json['current_user'] = user.email()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(result_json))

app = webapp2.WSGIApplication([
  ('/users', Users),
])

import json
import webapp2

from google.appengine.ext import ndb


class Item(ndb.Model):
  # this.quantityRequested = quantityRequested || 0;
  quantity = ndb.IntegerProperty()
  # this.owners = owners || [];
  recipients = ndb.StringProperty(repeated=True)
  # this.title = title || '';
  description = ndb.StringProperty()
  # this.description = description || '';
  notes = ndb.StringProperty()
  # this.links = links || [];
  links = ndb.StringProperty(repeated=True)
  # this.photos = photos || [];
  photos = ndb.StringProperty(repeated=True)
  # this.comments = comments || [];
  comments = ndb.StringProperty(repeated=True)
  # this.purchasers = purchasers || [];
  purchasers = ndb.StringProperty(repeated=True)

  def to_json(self):
    out = self.to_dict()
    out['key'] = self.key.urlsafe()
    return out


def serve_items_json(response):
  response.headers['Content-Type'] = 'application/json'
  response.out.write(json.dumps({
    'items': [item.to_json() for item in Item.query()],
  }))


class SaveItem(webapp2.RequestHandler):
  def post(self):
    item = Item()

    key = self.request.get('key')
    if key:
      old_item = Item.query(key=key)
      if old_item:
        item = old_item

    item.quantity = self.request.get('quantity')
    item.recipients = self.request.get('recipients')
    item.description = self.request.get('description')
    item.notes = self.request.get('notes')
    item.links = self.request.get('links')
    item.photos = self.request.get('photos')
    item.comments = self.request.get('comments')
    item.purchasers = self.request.get('purchasers')

    item.put()

    serve_items_json(self.response)


class Items(webapp2.RequestHandler):
  def get(self):
    serve_items_json(self.response)


app = webapp2.WSGIApplication([
  ('/save-item', SaveItem),
  ('/items', Items),
])

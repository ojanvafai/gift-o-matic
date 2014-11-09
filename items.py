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


def serve_items_json(response, item_to_include=None):
  response.headers['Content-Type'] = 'application/json'
  items = []
  for item in Item.query():
    if not item_to_include or item.key != item_to_include.key:
      items.append(item.to_json())

  if item_to_include:
    items.append(item_to_include.to_json())

  response.out.write(json.dumps({
    'items': items,
  }))


class SaveItem(webapp2.RequestHandler):
  def post(self):
    item = Item()

    raw_data = self.request.get('data')
    if not raw_data:
      # TODO: Make this a 404
      self.response.out.write('"data" field is required.')
      return

    data = json.loads(raw_data)

    key = data.get('key')
    if key:
      ndb_key = ndb.Key(urlsafe=key)
      old_item = ndb_key.get()
      if old_item:
        item = old_item

    item.quantity = int(data.get('quantity', 0))
    item.recipients = data.get('recipients', [])
    item.description = data.get('description', '')
    item.notes = data.get('notes', '')
    item.links = data.get('links', [])
    item.photos = data.get('photos', [])
    item.comments = data.get('comments', [])
    item.purchasers = data.get('purchasers', [])

    item.put()

    # Include the item we just saved since reading all the items is only
    # eventually consistent, but we know it wrote successfully.
    serve_items_json(self.response, item)


class Items(webapp2.RequestHandler):
  def get(self):
    serve_items_json(self.response)


app = webapp2.WSGIApplication([
  ('/save-item', SaveItem),
  ('/items', Items),
])

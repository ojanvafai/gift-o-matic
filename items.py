import datetime
import json
import webapp2

from google.appengine.ext import ndb


class Purchaser(ndb.Model):
  purchaser = ndb.StringProperty()
  quantity = ndb.IntegerProperty()
  is_purchased = ndb.BooleanProperty()


class Item(ndb.Model):
  quantity = ndb.IntegerProperty()
  recipients = ndb.StringProperty(repeated=True)
  description = ndb.StringProperty()
  notes = ndb.StringProperty()
  photos = ndb.StringProperty(repeated=True)
  comments = ndb.StringProperty(repeated=True)
  purchasers = ndb.StructuredProperty(Purchaser, repeated=True)
  created = ndb.DateProperty(auto_now_add=True)

  def to_jsonable(self):
    out = self.to_dict()
    out['created'] = str(self.created)
    out['key'] = self.key.urlsafe()
    return out


def serve_items_json(response, item_to_include=None, key_to_exclude=None):
  response.headers['Content-Type'] = 'application/json'
  items = []
  for item in Item.query():
    if ((not item_to_include or item.key != item_to_include.key) and
        item.key != key_to_exclude):
      items.append(item.to_jsonable())

  if item_to_include:
    items.append(item_to_include.to_jsonable())

  response.out.write(json.dumps({
    'items': items,
  }))


class DeleteItem(webapp2.RequestHandler):
  def post(self):
    key = self.request.get('key')
    if not key:
      # TODO: Make this a 404
      self.response.out.write('"key" field is required.')
      return

    ndb_key = ndb.Key(urlsafe=key)
    ndb_key.delete()

    # Appengine queries are only eventually consistent,
    # so we need to exclude the item we just deleted.
    serve_items_json(self.response, key_to_exclude=ndb_key)


class SaveItem(webapp2.RequestHandler):
  def post(self):
    raw_data = self.request.get('data')
    if not raw_data:
      # TODO: Make this a 404
      self.response.out.write('"data" field is required.')
      return

    item = Item()

    data = json.loads(raw_data)

    key = data.get('key')

    if key:
      ndb_key = ndb.Key(urlsafe=key)
      old_item = ndb_key.get()

      if not old_item.created:
        old_item.created = datetime.date(2016, 1, 1)

      if old_item:
        item = old_item

    quantity_string = data.get('quantity', 0)
    try:
      quantity = int(quantity_string)
    except ValueError as e:
      quantity = 0

    created = data.get('created')
    if created:
      parts = created.split('-')
      item.created = datetime.date(int(parts[0]), int(parts[1]), int(parts[2]))

    item.quantity = quantity
    item.recipients = data.get('recipients', [])
    item.description = data.get('description', '')
    item.notes = data.get('notes', '')
    item.photos = data.get('photos', [])
    item.comments = data.get('comments', [])
    item.purchasers = data.get('purchasers', [])

    item.put()

    # Include the item we just saved since reading all the items is only
    # eventually consistent, but we know it wrote successfully.
    serve_items_json(self.response, item_to_include=item)


class Items(webapp2.RequestHandler):
  def get(self):
    serve_items_json(self.response)


app = webapp2.WSGIApplication([
  ('/delete-item', DeleteItem),
  ('/save-item', SaveItem),
  ('/items', Items),
])

function ItemData(key, quantityRequested, owner, title, description, links, photos, comments, purchasers) {
  this.key = key;
  this.quantityRequested = quantityRequested || 0;
  this.owner = owner || '';
  this.title = title || '';
  this.description = description || '';
  this.links = links || [];
  this.photos = photos || [];
  this.comments = comments || [];
  this.purchasers = purchasers || [];
}

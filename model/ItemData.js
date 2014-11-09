function ItemData(key, quantityRequested, owners, title, description, links, photos, comments, purchasers) {
  this.key = key;
  this.quantityRequested = quantityRequested || 0;
  this.owners = owners || [];
  this.title = title || '';
  this.description = description || '';
  this.links = links || [];
  this.photos = photos || [];
  this.comments = comments || [];
  this.purchasers = purchasers || [];
}

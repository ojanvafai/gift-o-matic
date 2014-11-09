function ItemData(itemData) {
  // TODO: Rename these fields to match the itemData fields.
  this.key = itemData.key;
  this.quantityRequested = itemData.quantity;
  this.owners = itemData.recipients;
  this.title = itemData.description;
  this.description = itemData.notes;
  this.links = itemData.links;
  this.photos = itemData.photos;
  this.comments = itemData.comments;
  this.purchasers = itemData.purchasers;
}

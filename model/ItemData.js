function ItemData(itemData) {
  this.key = itemData.key;
  this.quantity = itemData.quantity;
  this.recipients = itemData.recipients;
  this.description = itemData.description;
  this.notes = itemData.notes;
  this.photos = itemData.photos;
  this.comments = itemData.comments;
  this.purchasers = itemData.purchasers;
  this.created = itemData.created != 'None' ? itemData.created : '2016-01-01';
  this.year = this.created.split('-')[0];
}

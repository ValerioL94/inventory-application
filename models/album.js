const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  description: { type: String, minLength: 1, maxLength: 500 },
  band: { type: Schema.Types.ObjectId, ref: 'Band' },
  price: { type: Number, required: true, min: 1, max: 100 },
  format: { type: String, required: true, minLength: 1, maxLength: 100 },
  stock: { type: Number, required: true, min: 0 },
});

AlbumSchema.virtual('url').get(function () {
  return `/catalog/album/${this._id}`;
});
AlbumSchema.virtual('get_price').get(function () {
  return `$${this.price.toString()}`;
});

module.exports = mongoose.model('Album', AlbumSchema);

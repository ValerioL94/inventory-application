const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  description: { type: String, minLength: 1, maxLength: 200, required: true },
  band: { type: Schema.Types.ObjectId, ref: 'Band' },
  price: { type: Number, required: true, min: 1, max: 50 },
  stock: { type: Number, required: true },
});

AlbumSchema.virtual('url').get(function () {
  return `/catalog/album/${this._id}`;
});

module.exports = mongoose.model('Album', AlbumSchema);

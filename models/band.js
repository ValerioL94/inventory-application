const { name } = require('ejs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BandSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  origin: { type: String, minLength: 1, maxLength: 100 },
  formed_in_year: { type: Number, min: 1900, max: new Date().getFullYear() },
  is_active: { type: Boolean },
});

BandSchema.virtual('url').get(function () {
  return `/catalog/band/${this._id}`;
});

module.exports = mongoose.model('Band', BandSchema);

const { name } = require('ejs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BandSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  origin: { type: String, minLength: 1, maxLength: 100 },
  formed_in: { type: Number },
  disbanded_in: { type: Number },
});

BandSchema.virtual('url').get(function () {
  return `/catalog/band/${this._id}`;
});

BandSchema.virtual('active_years').get(function () {
  let active_years_string = '';
  if (this.formed_in) {
    active_years_string = this.formed_in.toString();
  }
  active_years_string += ' - ';
  if (this.disbanded_in) {
    active_years_string += this.disbanded_in.toString();
  } else {
    active_years_string += 'present';
  }
  return active_years_string;
});

module.exports = mongoose.model('Band', BandSchema);

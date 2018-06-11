const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const pubrefSchema = new mongoose.Schema({
    publication: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  { minimize: false }
);

pubrefSchema.plugin(timestamps);

module.exports = mongoose.model('PubRefs', pubrefSchema);

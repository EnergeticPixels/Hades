const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const itemmediaSchema = new mongoose.Schema({
    stillURL: {
      type: String,
      trim: true
    },
    stillCaption: {
      type: String,
      trim: true
    },
    threeDURL: {
      type: String,
      trim: true
    }
  },
  { minimize: false }
);

itemmediaSchema.plugin(timestamps);

module.exports = mongoose.model('ItemMedia', itemmediaSchema);

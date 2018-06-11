const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const transdataSchema = new mongoose.Schema({
    unosn: {
      type: Number,
      trim: true
    },
    unopsn: {
      type: String,
      trim: true
    },
    qdClassSCG: {
      type: String,
      trim: true
    },
    DOTclass: {
      type: String,
      trim: true
    },
    DOTlabel: {
      type: String,
      trim: true
    },
    DODAC: {
      type: String,
      trim: true
    },
    drawing: {
      type: String,
      trim: true
    }
  },
  { minimize: false }
);

transdataSchema.plugin(timestamps);

module.exports = mongoose.model('TransData', transdataSchema);

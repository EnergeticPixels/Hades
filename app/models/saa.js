const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const saaSchema = new mongoose.Schema({
    munType: {
      type: String,
      required: true,
      trim: true,
      default: 'saa'
    },
    dodic: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4
    },
    size: {
      type: String,
      trim: true
    },
    nomenclature: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    itemMedia: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'ItemMedia'
    },
    pubRef: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'PubRef'
    },
    itemRef: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'ItemRef'
    },
    itemPhysical: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'ItemPhysical'
    },
    innerPackage: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'InnerPackage'
    },
    outerPackage: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'OuterPackage'
    }
  },
  { minimize: false }
);

saaSchema.plugin(timestamps);

module.exports = SmallArm = mongoose.model('saaItem', saaSchema);

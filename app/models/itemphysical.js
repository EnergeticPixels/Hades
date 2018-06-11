const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const itemphysicalSchema = new mongoose.Schema({
    length: {
      type: Number,
      trim: true
    },
    lengthUnit: {
      type: String,
      trim: true
    },
    width: {
      type: Number,
      trim: true
    },
    widthUnit: {
      type: String,
      trim: true
    },
    height: {
      type: Number,
      trim: true
    },
    heightUnit: {
      type: String,
      trim: true
    },
    diameter: {
      type: Number,
      trim: true
    },
    diameterUnit: {
      type: String,
      trim: true
    },
    propellant: {
      type: String,
      trim: true
    },
    propellantWeight: {
      type: Number,
      trim: true
    },
    propellantUnit: {
      type: String,
      trim: true
    },
    primer: {
      type: String,
      trim: true
    },
    primerWeight: {
      type: Number,
      trim: true
    },
    primerUnit: {
      type: String,
      trim: true
    },
    fuse: {
      type: String,
      trim: true
    },
    explosive: {
      type: String,
      trim: true
    },
    explosiveWeight: {
      type: Number,
      trim: true
    },
    explosiveUnit: {
      type: String,
      trim: true
    }
  },
  { minimize: false }
);

itemphysicalSchema.plugin(timestamps);

module.exports = mongoose.model('ItemPhysical', itemphysicalSchema);

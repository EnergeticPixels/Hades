const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const outerpackageSchema = new mongoose.Schema({
    material: {
        type: String,
        trim: true
    },
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
    volume: {
        type: Number,
        trim: true
    },
    volumeUnit: {
        type: String,
        trim: true
    }
  },
  { minimize: false }
);

outerpackageSchema.plugin(timestamps);

module.exports = mongoose.model('OuterPackage', outerpackageSchema);

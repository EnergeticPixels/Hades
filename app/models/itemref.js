const mongoose = require('mongoose');

const timestamps = require('mongoose-timestamp');

const itemrefSchema = new mongoose.Schema({
    pubRef: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'PubRefs'
    },
    itemSpec: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'PubRefs'
    },
    munInspect: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'PubRefs'
    }
  },
  { minimize: false }
);

itemrefSchema.plugin(timestamps);

module.exports = mongoose.model('ItemRefs', itemrefSchema);

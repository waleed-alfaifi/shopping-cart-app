const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new item schema.
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    autoCreate: process.env.NODE_ENV !== 'production' ? true : false,
  }
);

// Customize not found error.
itemSchema.post('findOne', (error, doc, next) => {
  if (error.name === 'CastError') {
    const customizedErr = new Error('The item could not be found.');
    customizedErr.name = error.name;
    customizedErr.code = 500;
    next(customizedErr);
  } else {
    next(error);
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This method checks for erros resulting of violating uniqeness of any unique field in MongoDB,
// and let us customize the displayed message.
userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    const customizedErr = new Error('Enter a different email.');
    customizedErr.name = error.name;
    customizedErr.code = 500;
    next(customizedErr);
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

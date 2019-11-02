const mongoose = require('mongoose');

mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_cart',
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log('Connected to the DB.'))
  .catch(err => console.log(err));

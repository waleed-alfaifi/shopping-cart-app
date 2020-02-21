const path = require('path');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Import routes.
const usersRoute = require('./routes/users');
const itemsRoute = require('./routes/items');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://shoppingcarttest11.herokuapp.com/',
  })
);

// Routing.
app.use('/user', usersRoute);
app.use('/items', itemsRoute);

// Middleware to handle MongoDB errors.
app.use((error, req, res, next) => {
  // If this is a MongoDB error.
  if (error.name === 'MongoError' || error.name === 'CastError') {
    return res.status(error.code || 500).json({ error: error.message });
  }

  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.status(404).json({ error: 'Page not found 404' });
});

require('./models/connect'); // Connect to the DB.

app.listen(process.env.PORT || 5000, () => console.log('Server running...'));

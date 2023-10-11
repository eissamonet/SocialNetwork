const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { mongo } = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

// Use this to log mongo queries being executed
mongo.set('debug', true);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
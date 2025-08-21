const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mydatabaseapi2')


const db = mongoose.connection;


db.once('open', (err) => {
    if (err) {
      console.error(`Error connecting to MongoDB: ${err}`);
    } else {
      console.log('Connected to MongoDB');
    }
});
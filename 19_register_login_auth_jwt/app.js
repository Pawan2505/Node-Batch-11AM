const express = require('express');
const db = require('./config/db')
const path = require('path')
const port = 8000;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/student.routes'));
app.use('/faculty', require('./routes/faculties.routes'));
app.use('/users',require('./routes/users.routes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
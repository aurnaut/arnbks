const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);


app.use(express.static(path.join(__dirname, 'client', 'public')))


app.use(express.static( 'client/build' ));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
})
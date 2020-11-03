const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  readByMar: {type: Boolean},
  // readByAnd: {type: Boolean, default: false},
  // currentlyReadingMar: {type: Boolean, default: false},
  // currentlyReadingAnd: {type: Boolean, default: false},
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  date: { type: Date, required: true },
  cover: {type: String },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
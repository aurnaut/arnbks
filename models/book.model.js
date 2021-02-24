const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  language: { type: String, required: true },
  readByMar: {type: Boolean},
  readByAnd: {type: Boolean},
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  cover: {type: String },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
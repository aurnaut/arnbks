const router = require('express').Router();
let Book = require('../models/book.model');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: './client/public/uploads',
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname);
  }
});

const upload = multer({
  storage: storage
});

router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', upload.single('cover'), (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const readByMar = req.body.readByMar;
  // const readByAnd = req.body.readByAnd;
  // const currentlyReadingMar = req.body.currentlyReadingMar;
  // const currentlyReadingAnd = req.body.currentlyReadingAnd;
  const description = req.body.description;
  const pages = Number(req.body.pages);
  const date = Date.parse(req.body.date);
  const cover = (req.file) ? req.file.filename : null;

  const newBook = new Book({
    title,
    author,
    readByMar,
    // readByAnd,
    // currentlyReadingMar,
    // currentlyReadingAnd,
    description,
    pages,
    date,
    cover
  });

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', upload.single('cover'), (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      const coverUpdate = (req.file) ? req.file.filename : book.cover; //multer
      book.title = req.body.title;
      book.author = req.body.author;
      book.readByMar = req.body.readByMar;
      // book.readByAnd = req.body.readByAnd;
      // book.currentlyReadingMar = req.body.currentlyReadingMar;
      // book.currentlyReadingAnd = req.body.currentlyReadingAnd;
      book.description = req.body.description;
      book.pages = Number(req.body.pages);
      book.date = Date.parse(req.body.date);
      book.cover = coverUpdate;
      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
const router = require('express').Router();
let Book = require('../models/book.model');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: './public/uploads',
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
  const category = req.body.category;
  const readByMar = req.body.readByMar;
  const description = req.body.description;
  const pages = Number(req.body.pages);
  const cover = (req.file) ? req.file.filename : null;

  const newBook = new Book({
    title,
    category,
    readByMar,
    description,
    pages,
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
      book.category = req.body.category;
      book.readByMar = req.body.readByMar;
      book.description = req.body.description;
      book.pages = Number(req.body.pages);
      book.cover = coverUpdate;
      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
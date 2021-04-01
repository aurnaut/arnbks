const router = require('express').Router();
let Book = require('../models/book.model');
const multer = require('multer');
const FTPStorage = require('multer-ftp');
 
const upload = multer({
  storage: new FTPStorage({
    basepath: '/public_html/arnbks',
    ftp: {
      host: 'marn.ro',
      user: 'aaa',
      password: 'bbb'
    }
  })
})

router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', upload.single('cover'), (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const language = req.body.language;
  const readByMar = req.body.readByMar;
  const readByAnd = req.body.readByAnd;
  const description = req.body.description;
  const pages = Number(req.body.pages);
  const cover = (req.file) ? (req.file.path).split("/").pop() : null;

  const newBook = new Book({
    title,
    author,
    category,
    language,
    readByMar,
    readByAnd,
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
      const coverUpdate = (req.file) ? (req.file.path).split("/").pop() : book.cover; //multer
      book.title = req.body.title;
      book.author = req.body.author;
      book.category = req.body.category;
      book.language = req.body.language;
      book.readByMar = req.body.readByMar;
      book.readByAnd = req.body.readByAnd;
      book.description = req.body.description;
      book.pages = Number(req.body.pages);
      book.cover = coverUpdate;
      console.log(req.file);
      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from "./components/navbar.component"
import BooksList from "./components/books-list.component";
import EditBook from "./components/edit-book.component";
import CreateBook from "./components/create-book.component";
import CreateAuthor from "./components/create-author.component";
import Homepage from './components/home-page.component';
import RandomBook from './components/random-book.component';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={Homepage} />
      <Route path="/books/" component={BooksList} />
      <Route path="/edit/:id" component={EditBook} />
      <Route path="/create" component={CreateBook} />
      <Route path="/author" component={CreateAuthor} />
      <Route path="/random-book" component={RandomBook} />
    </Router>
  );
}

export default App;

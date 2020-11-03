import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Books</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/books" className="nav-link">Books</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Add book</Link>
          </li>
          <li className="navbar-item">
            <Link to="/random-book" className="nav-link">Random book</Link>
          </li>
          <li className="navbar-item">
            <Link to="/author" className="nav-link">Add author</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import Slot from 'react-slot-machine';
import '../RandomBook.css';

class RandomBook extends Component {
  
  constructor() {
    super();
    this.state = {
      target: 0,
      times: 2,
      duration: 1000,
      turn: true,
      data: [],
      selectedBook: false
    };

    this.selectBook = this.selectBook.bind(this);
  }


  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

      document.getElementById('ceva').querySelectorAll('li').forEach(element => {
        element.classList.remove('selected-book');
      })
  }


  componentDidUpdate() {
    console.log(this.state);

    document.getElementById('ceva').querySelectorAll('li').forEach(element => {
      if(element.classList.contains('selected-book')) {
        element.classList.remove('selected-book');
      }
    })
    if(this.state.selectedBook) {
      setTimeout(function(){ 
        document.getElementById('ceva').querySelectorAll('li')[this.state.target].classList.add('selected-book');
      }.bind(this), 500)
    }
  }

  selectBook() {
    this.setState({ target: Math.floor(Math.random() * (this.state.data.length)), selectedBook: true})
  }


  render() {
    return (
      <div>
        <Slot
          className="slot"
          duration={this.state.duration}
          target={this.state.turn ? this.state.target : 0}
          times={this.state.times}
        >
          {this.state.data.filter(book => book).map(unreadBooksByMar => (
            <div className="slot-item" key={unreadBooksByMar.title}>
              {unreadBooksByMar.title.split('\n').map(v => <div key={unreadBooksByMar.title}>{v}</div>)}
            </div>
          ))}
        </Slot>
        <h2>List</h2>
        <ul id="ceva" style={{padding: 0, margin: 0}}>
          {this.state.data.filter(book => book).map((unreadBooksByMar, i) => (
            <li style={{listStyle: 'none', padding: 0, margin: 0}} key={unreadBooksByMar.title}>
              <p>
              <span>{i + 1}. </span>
              <img className="small-cover-random" src={'/uploads/'+ unreadBooksByMar.cover} />
              {unreadBooksByMar.title}</p>
            </li>
          ))}
        </ul>
        <label>
          <button
            onClick={ this.selectBook }>
            Your Next Book
          </button>
        </label>
      </div>
    );
  }
}
export default RandomBook;
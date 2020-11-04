import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FilterResults from 'react-filter-search';

const Book = props => (
  <tr>
    <td><img style={{maxWidth:100, border: '1px solid', borderRadius: 5}} src={'/uploads/'+ props.book.cover} /></td>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>{props.book.readByMar === true ? 'Yes': 'No'}</td>
    <td>{props.book.description}</td>
    <td>{props.book.pages}</td>
    <td>{props.book.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
    </td>
  </tr>
)

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.compareBy = this.compareBy.bind(this);

    this.state = {
      data: [],
      value: '',
      ascSort: false
    };
  }

  componentDidMount() {
    axios.get('/api/books/')
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.delete('/api/books/'+id);

    this.setState({
      data: this.state.data.filter(el => el._id !== id)
    })
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  compareBy(key) {
    if(!this.state.ascSort) {
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    } else {
      return function (a, b) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
    
  }

  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
    this.setState({ascSort: !this.state.ascSort});
  }

  render() {
    const { data, value } = this.state;

    return (
      <div>
        <h3>Books: {this.state.data.length}</h3>
        <input type="text" value={value} onChange={this.handleChange} />
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Cover</th>
              <th onClick={() => this.sortBy('title')} >Title</th>
              <th onClick={() => this.sortBy('author')} >Author</th>
              <th onClick={() => this.sortBy('readByMar')}> Read By Marius</th>
              <th>Description</th>
              <th onClick={() => this.sortBy('pages')}>Pages</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <FilterResults
              value={value}
              data={data}
              renderResults={results => (
                <React.Fragment>
                  {results.map(currentbook => {
                    return <Book data={this.state.data} book={currentbook} deleteBook={this.deleteBook} key={currentbook._id} />
                  })}
                </React.Fragment>
              )}
            />
          </tbody>
        </table>
      </div>
    )
  }
}
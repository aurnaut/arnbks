import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeAuthor(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const name = {
      name: this.state.name
    }

    console.log(name);

    axios.post('http://localhost:5000/authors/add', name)
      .then(res => console.log(res.data));

    this.setState({
      name: ''
    });
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Author</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeAuthor}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Author" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
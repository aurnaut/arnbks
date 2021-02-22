import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeCategory(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const name = {
      name: this.state.name
    }

    axios.post('/api/categories/add', name)
    .then(res => {
      if(res){
        this.props.history.push('/');
      }
    })

    this.setState({
      name: ''
    });
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeCategory}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Category" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
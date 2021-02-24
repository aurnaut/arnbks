import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeReadByMar = this.onChangeReadByMar.bind(this);
    this.onChangeReadByAnd = this.onChangeReadByAnd.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePages = this.onChangePages.bind(this);
    this.onChangeCover = this.onChangeCover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      author: '',
      category: '',
      language: '',
      defaultCategory: null,
      readByMar: false,
      readByAnd: false,
      description: '',
      pages: 0,
      cover: null,
      showImage: '',
      categories: []
    }
  }

  componentDidMount() {
    axios.get('/api/categories/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            categories: response.data.map(category => category.name),
            category: response.data[0].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value
    })
  }

  onChangeReadByMar() {
    this.setState({
      readByMar: !this.state.readByMar
    })
  }

  onChangeReadByAnd() {
    this.setState({
      readByAnd: !this.state.readByAnd
    })
  }

  onChangeReadByAnd(e) {
    this.setState({
      readByAnd: e.target.checked
    })
  }

  onChangeCurrentlyReadingMar(e) {
    this.setState({
      currentlyReadingMar: e.target.checked
    })
  }

  onChangeCurrentlyReadingAnd(e) {
    this.setState({
      currentlyReadingAnd: e.target.checked
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePages(e) {
    this.setState({
      pages: e.target.value
    })
  }

  onChangeCover(e) {
    this.setState({
      cover: e.target.files[0],
      showImage: URL.createObjectURL(e.target.files[0])
    })
  }

  onSubmit(e) {
    e.preventDefault();

    let book = new FormData();
    const { title, author, category, language, description, pages, cover, readByMar, readByAnd } = this.state;
    book.append("title", title);
    book.append("author", author);
    book.append("category", category);
    book.append("language", language);
    book.append("readByMar", readByMar);
    book.append("readByAnd", readByAnd);
    book.append("description", description);
    book.append("pages", pages);
    book.append("cover", cover);


    axios.post('/api/books/add', book)
    .then(res => {
      if(res){
        this.props.history.push('/books');
      }
    })
  }

  render() {
    return (
    <div>
      <h3>Create New Book</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Author: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
        </div>
        <div className="form-group"> 
          <label>Category: </label>
          <select ref="categoryInput"
              required
              className="form-control"
              value={this.state.category}
              onChange={this.onChangeCategory}>
              {
                this.state.categories.map(function(category) {
                  return <option 
                    key={category}
                    value={category}>{category}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Language: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.language}
              onChange={this.onChangeLanguage}
              />
        </div>
        <div className="form-group"> 
          <label>Read by Marius: </label>
          <input type="checkbox"
              className="form-control"
              checked={this.state.readByMar}
              value={this.state.readByMar}
              onChange={this.onChangeReadByMar}
              />
        </div>
        <div className="form-group"> 
          <label>Read by Andreea: </label>
          <input type="checkbox"
              className="form-control"
              checked={this.state.readByAnd}
              value={this.state.readByAnd}
              onChange={this.onChangeReadByAnd}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Pages: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.pages}
              onChange={this.onChangePages}
              />
        </div>

        <div className="form-group"> 
          <label>Cover: </label>
          <input type="file"
              required
              name="cover"
              className="form-control"
              onChange={this.onChangeCover}
              />
          <img style={{maxWidth:100}} src={this.state.showImage} alt={this.state.title} />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
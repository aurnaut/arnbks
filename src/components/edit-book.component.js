import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeReadByMar = this.onChangeReadByMar.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePages = this.onChangePages.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCover = this.onChangeCover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      author: '',
      readByMar: false,
      description: '',
      pages: 0,
      date: new Date(),
      cover: null,
      isEditImage: false,
      showImage: '',
      authors: []
    }
  }

  componentDidMount() {
    axios.get('/api/books/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          author: response.data.author,
          readByMar: response.data.readByMar,
          description: response.data.description,
          pages: response.data.pages,
          showImage: response.data.cover,
          cover: response.data.cover,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/api/authors/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            authors: response.data.map(author => author.name)
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

  onChangeReadByMar(e) {
    this.setState({
      readByMar: !this.state.readByMar
  });
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

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeCover(e) {
    this.setState({
      cover: e.target.files[0],
      showImage: URL.createObjectURL(e.target.files[0]),
      isEditImage: true
    })
  }

  onSubmit(e) {
    e.preventDefault();

    let book = new FormData();
    
    const { title, author, readByMar, description, pages, date, cover } = this.state;
    const id = this.props.match.params.id;
    book.append("title", title);
    book.append("author", author);
    book.append("readByMar", readByMar);
    book.append("description", description);
    book.append("pages", pages);
    book.append("date", date);
    book.append("cover", cover);
    book.append("id",id);


    axios.put('/api/books/update/' + this.props.match.params.id, book,)
    .then(res => {
      if(res){
        this.props.history.push('/books');
      }
    })
  }

  render() {
    return (
    <div>
      <h3>Edit Book</h3>
      <form onSubmit={this.onSubmit} method="post" encType="multipart/form-data">
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
          <select ref="authorInput"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}>
              {
                this.state.authors.map(function(author) {
                  return <option 
                    key={author}
                    value={author}>{author}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Read By Maius: </label>
          <input type="checkbox"
              className="form-control"
              // {this.state.readByMar ? 'checked' : null} 
              checked={this.state.readByMar}
              value={this.state.readByMar}
              onChange={this.onChangeReadByMar}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Pages: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.pages}
              onChange={this.onChangePages}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Cover</label>
          <input type="file" name='cover'
              
              className="form-control" 
              onChange={this.onChangeCover}
          />
              {this.state.isEditImage ? <img style={{maxWidth:100}} src={this.state.showImage}/> : <img style={{maxWidth:100}} src={'/uploads/'+this.state.showImage}/>}
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
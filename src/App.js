import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount = () => {
    axios.get("https://api.jikan.moe/v3/top/anime")
      .then(response => {
        this.setState({
          posts: response.data.top
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  showImage = imageUrl => {
    ipcRenderer.send('toggle-image', imageUrl);
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {
            this.state.posts.map(post =>
              <li
                key={post.mal_id}
                className="list-group-item flex-container"
                onClick={ () => this.showImage(post) }
              >
                <img src={post.image_url} alt="thumb" className="thumbnail" />
                <div>{post.title}</div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;

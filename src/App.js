import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Menu = electron.remote.Menu;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount = () => {
    this.initMenu();

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

  initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          { label: "New Window" },
          {
            label: "Settings",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-settings");
            }
          },
          { type: "separator" },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Menu Item 1" },
          { label: "Menu Item 2" },
          { label: "Menu Item 3" }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
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
                onClick={() => this.showImage(post)}
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

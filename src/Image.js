import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Image extends Component {

    constructor(props) {
        super(props);
        this.state = { item: "" }
    }

    componentDidMount = () => {
        ipcRenderer.on('item', (event, arg) => {
            this.setState({ item: arg });
        });
    }
    
    render() {
        return (
            <img src={this.state.item.image_url} alt="thumb" style={{maxWidth: '100%'}}/>
        );
    }
}

export default Image;
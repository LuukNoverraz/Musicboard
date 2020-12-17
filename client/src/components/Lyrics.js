import React, { Component } from 'react'
// import '../App.css'

import Song from "./Song"
import { getLyrics, getSong } from 'genius-lyrics-api'


class Lyrics extends Component {
    constructor(props) {
      super(props)
      this.state = {
        options: {
          apiKey: 'kHNjO1P0AMy3WMtyW-35CXo0FIlSK17F9rMK0XUlYT1CT26ORlNe6RiELEViuLfInCJ1fnOQ9Qbv3B9Yt8mSkA',
          title: '',
          artist: '',
          optimizeQuery: true
        }
      }
  }

  componentDidMount() {
    this.setState({
      options: {
        apiKey: 'kHNjO1P0AMy3WMtyW-35CXo0FIlSK17F9rMK0XUlYT1CT26ORlNe6RiELEViuLfInCJ1fnOQ9Qbv3B9Yt8mSkA',
        title: '',
        artist: '',
        optimizeQuery: true
      }
    })
    getSong(this.state.options).then((lyrics) => console.log(lyrics));
}

  render() {
    return (
      <div className="lyrics-component">
        <p>Title: {this.props.title}</p>  
        <p>Artist: {this.props.artist}</p>
      </div>
    )
  }
}

export default Lyrics;
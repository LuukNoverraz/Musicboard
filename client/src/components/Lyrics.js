import React, { Component } from 'react'
// import '../App.css'

import Song from "./Song"

class Lyrics extends Component {
    constructor(props) {
      super(props)
      this.state = {
        songLyrics: "No lyrics found"
      }
      this.componentDidMount = this.componentDidMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    var encodedSongName = encodeURIComponent(this.props.parentSong.name.trim())
    var encodedSongArtist = encodeURIComponent(this.props.parentSong.artists.trim())

    console.log(encodedSongName)
  }

  componentDidUpdate() {
    let that = this

    this.interval = setInterval(() =>
    fetch('https://api.lyrics.ovh/v1/' + encodedSongArtist + '/' + encodedSongName)
    .then(response => response.json())
    .then(function(data) {
      that.setState({songLyrics: data.lyrics})
      console.log("Song Lyrics : " + that.state.songLyrics)
    }), 3000)
  }
  
  render() {
    return (
      <div className="lyrics-component">
        <p className="br-3"></p>
        <h2 className="lyrics-header">Lyrics</h2>
        <hr></hr>
        <br></br>
        <p className="lyrics-content">
          {this.state.songLyrics}
        </p>
      </div>
    )
  }
}

export default Lyrics;
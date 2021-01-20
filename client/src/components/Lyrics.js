import React, { Component } from 'react'
// import '../App.css'

import Song from "./Song"

class Lyrics extends Component {
    constructor(props) {
      super(props)
      this.state = {
        songLyrics: "No lyrics found",
        tempSongName: "No name found",
        encodedSongName: "No name found",
        encodedSongArtist: "No artist found"
      }
      this.componentDidMount = this.componentDidMount.bind(this);
  }

  changeSongState() {
    // Remove the "Remastered" text from songs that have been listed as such on Spotify to receive lyrics from original

    if (this.props.parentSong.name.endsWith(" - Remastered")) {
      this.setState({tempSongName: this.props.parentSong.name})
      this.setState({tempSongName: this.state.tempSongName.replace(' - Remastered', '')})
    }
    this.state.encodedSongName = encodeURIComponent(this.state.tempSongName.trim())
    this.state.encodedSongArtist = encodeURIComponent(this.props.parentSong.artists.trim())
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.changeSongState()

      var that = this

      fetch('https://api.lyrics.ovh/v1/' + this.state.encodedSongArtist + '/' + this.state.encodedSongName)
      .then(response => response.json())
      .then(function(data) {
        if (data.lyrics !== "") {
          that.setState({songLyrics: data.lyrics})
          console.log(that.state.songLyrics)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }, 3000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
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
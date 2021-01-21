import React, { Component } from 'react'

class Lyrics extends Component {
    constructor(props) {
      super(props)
      this.state = {
        songLyrics: "No lyrics found",
        tempSongName: "No name found",
        encodedSongName: "No name found",
        encodedSongArtist: "No artist found"
      }
      this.componentDidMount = this.componentDidMount.bind(this)
  }

  changeSongState() {
    // Remove the "Remastered" text from songs that have been listed as such on Spotify to receive lyrics from original

    this.setState({tempSongName: this.props.parentSong.name})

    // Format: Song - Remastered

    if (this.props.parentSong.name.endsWith(" - Remastered")) {  
      this.setState({tempSongName: this.state.tempSongName.replace(' - Remastered', '')})
    }

    // Format: Song - Remastered **** (Year)

    else if (this.props.parentSong.name.slice(-4, -3) == "1" || this.props.parentSong.name.slice(-4, -3) == "2") {
      this.setState({tempSongName: this.state.tempSongName.replace(this.props.parentSong.name.slice(-18), '')})
    }

    // Format: Song - **** (Year) Remaster

    else if (this.props.parentSong.name.slice(-13, -12) == "1" || this.props.parentSong.name.slice(-13, -12) == "2") {
      this.setState({tempSongName: this.state.tempSongName.replace(this.props.parentSong.name.slice(-16), '')})
    }

    // Format: Song - Live

    if (this.props.parentSong.name.endsWith(" - Live")) {  
      this.setState({tempSongName: this.state.tempSongName.replace(' - Live', '')})
    }

    this.state.encodedSongName = encodeURIComponent(this.state.tempSongName.trim())
    this.state.encodedSongArtist = encodeURIComponent(this.props.parentSong.artists.trim())
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.changeSongState()

      var that = this

      // Get lyrics from lyrics.ovh api using the encoded song artist and name

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
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default Lyrics
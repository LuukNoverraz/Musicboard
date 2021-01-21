import React, { Component } from 'react'

class Info extends Component {
    constructor(props) {
      super(props)
      this.state = {
        songArtist: "No artist found",
        artistInfo: "No info found"
      }
      this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    var that = this

    this.interval = setInterval(() => {
        this.setState({songArtist: encodeURIComponent(this.props.parentSong.artists.trim())})

        // Get link to last.fm artist information using song component's artist variable

        fetch("https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + this.state.songArtist + "&api_key=7c70f9d49f918676a81efebde42ea9f7&format=json", {
            "method": "GET",
        })
        .then(response => response.json())
        .then(function(data) {
            that.setState({artistInfo: data.artist.bio.summary})
            // Remove link to last.fm at end of summary
            var index = that.state.artistInfo.indexOf("<a ")
            that.setState({artistInfo: that.state.artistInfo.substr(0, index)})
          })
        .catch(error => {
            console.log(error)
        })
    }, 3000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  
  render() {
    return (
      <div className="info-component">
            <p>{this.state.artistInfo}</p>
      </div>
    )
  }
}

export default Info
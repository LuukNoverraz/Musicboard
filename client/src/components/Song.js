import React, { Component } from 'react'
import '../App.css'

import Lyrics from "./Lyrics.js"
import Info from "./Info.js"

import error from '../images/error.png'
import pause from '../images/pause overlay.png'
import check from '../images/check.png'

import SpotifyWebApi from 'spotify-web-api-js'
const spotifyApi = new SpotifyWebApi()

class Song extends Component {
    constructor() {
        super()
        const params = this.getHashParams()
        const token = params.access_token
        if (token) {
            spotifyApi.setAccessToken(token)
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumName: 'Not Checked', albumArt: error, artists: '', isPlaying: true }
        }
  }

  getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2])
        e = r.exec(q)
    }
    return hashParams
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumName: response.item.album.name,
                albumArt: response.item.album.images[0].url,
                artists: response.item.artists[0].name,
                isPlaying: response.is_playing
            }
        })
      })
      .catch((response) => {
        this.setState({
            nowPlaying: {
                name: 'No song found',
                albumName: 'No album found',
                albumArt: error,
                artists: 'No artist found',
                isPlaying: true
            }
        })
      })
  }

    componentDidMount() {
        this.interval = setInterval(() =>
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          console.log(response)
          this.setState({
              nowPlaying: {
                name: response.item.name, 
                albumName: response.item.album.name,
                albumArt: response.item.album.images[0].url,
                artists: response.item.artists[0].name,
                isPlaying: response.is_playing
              }
          })
        })
        .catch((response) => {
          this.setState({
              nowPlaying: {
                name: 'No song found',
                albumName: 'No album found',
                albumArt: error,
                artists: 'No artist found',
                isPlaying: true
              }
          })
        }), 3000)
    }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <div>
        <div className="song-component">
          <br></br>
          <br></br>
          <div className="song-info">
            <br></br>
            <div id="now-playing-song">
              { this.state.nowPlaying.name }
            </div>
            <div id="now-playing-artist">
              { this.state.nowPlaying.artists }
              <br></br>
              <i>{ this.state.nowPlaying.albumName }</i>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="image-container">
            <img src={this.state.nowPlaying.albumArt} className="album-art" alt="Album Cover"/>
            <div className="album-art overlay">
              { this.state.nowPlaying.isPlaying ?
                <img alt=""></img>
                : <img src={pause} className="overlay-image" alt=""></img>
              }
              </div>
          </div>
          <br></br>
          <br></br>
          { this.state.loggedIn &&
            <button onClick={() => this.getNowPlaying()} className="song-info">
              Check Now Playing
            </button>
          }
          <br></br>
          <br></br>
          <div>
            <a href='http://localhost:8888' className="song-info"> Login to Spotify </a>
            &nbsp;
            { this.state.nowPlaying ?
            <p></p>
            : <img src={check} className="check"></img>
            }
          </div>
        </div>
        <Lyrics parentSong = {this.state.nowPlaying}/>
        <Info parentSong = {this.state.nowPlaying}/>
      </div>
    )
  }
}

export default Song
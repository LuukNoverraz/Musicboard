import React, { Component } from 'react';
import '../App.css';

import error from '../images/error.png';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class Song extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: error, popularity: null }
        }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url,
                popularity: response.item.popularity
            }
        });
      })
      .catch((response) => {
        this.setState({
            nowPlaying: {
                name: 'No song found',
                albumArt: error,
                popularity: null
            }
        })
      })
  }

    componentDidMount() {
        this.interval = setInterval(() => 
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
        this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url,
                popularity: response.item.popularity
            }
        })
        })
        .catch((response) => {
        this.setState({
            nowPlaying: {
                name: 'No song found',
                albumArt: error,
                popularity: null
            }
        })
        }), 3000)
    }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        <div>
          Popularity: { this.state.nowPlaying.popularity }
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }
}

export default Song;
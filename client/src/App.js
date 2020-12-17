import React, { Component } from 'react'

import Song from "./components/Song"
import Lyrics from "./components/Lyrics"

class App extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="component-container">
        <Song />
        <Lyrics title="OK" artist="RTIATIST"/>
      </div>
    );
  }
}

export default App;
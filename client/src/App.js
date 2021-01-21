import React, { Component } from 'react'

import Header from "./components/Header"
import Song from "./components/Song"

class App extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="component-container">
        <div className="background-container">
          <Header />
          <Song />
        </div>
        <p className="br-10"></p>
      </div>
    )
  }
}

export default App
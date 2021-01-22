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
        <Header />
        <div className="background-container">
          <Song />
        </div>
        <p className="br-10"></p>
      </div>
    )
  }
}

export default App
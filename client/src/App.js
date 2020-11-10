import React, { Component } from 'react';

import Song from "./components/Song"

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="componentContainer">
        <Song />
      </div>
    );
  }
}

export default App;
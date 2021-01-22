import React, { Component } from 'react'


class Header extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
  }

  render() {
    return (
      <div className="header-component">
        <br></br>
        <p className="title">Musicboard</p>
        <br></br>
      </div>
    )
  }
}

export default Header
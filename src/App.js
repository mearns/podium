import React, { Component } from 'react'
import SlideShow from './components/SlideShow'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SlideShow slides={this.props.slides} />
      </div>
    )
  }
}

export default App

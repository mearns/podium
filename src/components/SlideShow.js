import React, { Component } from 'react'
import defaultTheme from './themes/default'

export default class SlideShow extends Component {
  constructor ({ slides, startingLocation = 0 }) {
    super({ slides, startingLocation })
    this.state = {
      currentLocation: startingLocation,
      theme: defaultTheme
    }
  }

  getCurrentSlide () {
    return this.props.slides[this.state.currentLocation]
  }

  render () {
    const currentSlide = this.getCurrentSlide()
    return this.state.theme.renderSlide(currentSlide.type, currentSlide.content)
  }
}

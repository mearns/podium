import { Component } from 'react'
import defaultTheme from './themes/default'

const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_SPACE = 32
const KEY_BACKSPACE = 8
const KEY_RETURN = 13

export default class SlideShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentLocation: this.props.startingLocation,
      theme: defaultTheme
    }
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  _navigateBack () {
    this.setState(state => {
      const nextLocation = state.currentLocation - 1
      if (nextLocation >= 0) {
        return { currentLocation: nextLocation }
      }
      return {}
    })
  }

  _navigateForward () {
    this.setState((state, props) => {
      const nextLocation = state.currentLocation + 1
      if (nextLocation < props.slides.length) {
        return { currentLocation: nextLocation }
      }
      return {}
    })
  }

  _handleKeyDown (event) {
    switch (event.keyCode) {
      case KEY_LEFT:
      case KEY_BACKSPACE:
        this._navigateBack()
        break

      case KEY_RIGHT:
      case KEY_SPACE:
      case KEY_RETURN:
        this._navigateForward()
        break

      default: break
    }
  }

  componentWillMount () {
    document.addEventListener('keydown', this._handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this._handleKeyDown)
  }

  getCurrentSlide () {
    return this.props.slides[this.state.currentLocation]
  }

  render () {
    const currentSlide = this.getCurrentSlide()
    return this.state.theme.renderSlide(currentSlide.type, currentSlide.content)
  }
}

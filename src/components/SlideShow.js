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
      currentLocation: this._loadLocationFromHash([0, 0]),
      theme: defaultTheme
    }
    this._update()
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleHashChange = this._handleHashChange.bind(this)
  }

  _findSlideNumber (slideId, props = this.props) {
    const slideNumber = parseInt(slideId)
    if (isNaN(slideNumber)) {
      return props.slideNumbersById[slideId]
    } else {
      return slideNumber
    }
  }

  _findPhaseNumber (phaseId, slide = this.getCurrentSlide()) {
    const phaseNumber = parseInt(phaseId)
    if (isNaN(phaseNumber)) {
      return 0
    } else if (phaseNumber >= slide.phaseCount) {
      return (slide.phaseCount && slide.phaseCount - 1) || slide.phaseCount
    }
    return phaseNumber
  }

  _parseLocation (locationString, currentLocation, props = this.props) {
    const [slideId, phaseId = 0] = locationString.split('-', 2)
    const slideNumber = this._findSlideNumber(slideId, props)
    const slide = props.slides[slideNumber]
    if (slide == null) {
      return currentLocation
    }
    const phaseNumber = this._findPhaseNumber(phaseId, slide)
    return [slideNumber, phaseNumber]
  }

  _loadLocationFromHash (currentLocation, props = this.props) {
    return this._parseLocation(window.location.hash.substr(1), currentLocation, props)
  }

  _handleHashChange () {
    this.setState(({ currentLocation }, props) => {
      const [slide, phase] = this._loadLocationFromHash(currentLocation, props)
      if (currentLocation[0] !== slide || currentLocation[1] !== phase) {
        return { currentLocation: [slide, phase] }
      }
      return {}
    })
  }

  _navigateBack () {
    this.setState((state, props) => {
      const [slide, phase] = state.currentLocation
      if (phase === 0) {
        if (slide > 0) {
          const phaseCount = props.slides[slide - 1].phaseCount
          return { currentLocation: [ slide - 1, phaseCount === 0 ? 0 : phaseCount - 1 ] }
        }
        return {}
      } else {
        return { currentLocation: [ slide, phase - 1 ] }
      }
    })
  }

  _navigateForward () {
    this.setState((state, props) => {
      const [slide, phase] = state.currentLocation
      const phaseCount = props.slides[slide].phaseCount
      if (phaseCount !== null && phase + 1 < phaseCount) {
        return { currentLocation: [ slide, phase + 1 ] }
      } else if (slide + 1 < props.slides.length) {
        return { currentLocation: [ slide + 1, 0 ] }
      }
      return {}
    })
  }

  _update () {
    const slide = this.getCurrentSlide()
    this._currentSlideId = slide.ids[0] || this.state.currentLocation[0]
    const newHash = `${this._currentSlideId}-${this.state.currentLocation[1]}`
    if (window.location.hash !== newHash) {
      window.location.hash = newHash
    }
  }

  componentDidUpdate () {
    this._update()
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
    window.addEventListener('hashchange', this._handleHashChange)
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this._handleHashChange)
    document.removeEventListener('keydown', this._handleKeyDown)
  }

  getCurrentSlide () {
    return this.props.slides[this.state.currentLocation[0]]
  }

  render () {
    const currentSlide = this.getCurrentSlide()
    return this.state.theme.renderSlide(
      currentSlide.type,
      {
        ...currentSlide,
        phase: this.state.currentLocation[1]
      }
    )
  }
}

import defaultSlide from './__default__'

class DefaultTheme {
  constructor () {
    this._defaultSlide = defaultSlide
    this._slides = {}
  }

  renderSlide (slideType, slideContent) {
    const slide = this._slides[slideType] || this._defaultSlide
    return slide(slideContent)
  }
}

const defaultTheme = new DefaultTheme()
export default defaultTheme

import defaultSlide from './__default__'
import bulletList from './BulletList'
import numberedList from './NumberedList'
import text from './Text'

class DefaultTheme {
  constructor () {
    this._defaultSlide = defaultSlide
    this._slides = {
      'bullet-list': bulletList,
      'numbered-list': numberedList,
      'text': text
    }
  }

  renderSlide (slideType, slideContent) {
    const slide = this._slides[slideType] || this._defaultSlide
    return slide(slideContent)
  }
}

const defaultTheme = new DefaultTheme()
export default defaultTheme

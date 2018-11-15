
class Slide {
  constructor ({ ids = [], tags = [], content = {}, type }) {
    this.ids = ids
    this.content = content
    this.phaseCount = 0
    const itemize = this.itemize = tags.includes('itemize')
    const hasBullets = Array.isArray(content.bullets)
    const hasList = Array.isArray(content.list)
    const hasParagraphs = Array.isArray(content.paragraphs)
    if (hasBullets && !hasList && !hasParagraphs) {
      this.type = 'bullet-list'
      if (itemize) {
        this.phaseCount = content.bullets.length
      }
    } else if (hasList && !hasBullets && !hasParagraphs) {
      this.type = 'numbered-list'
      if (itemize) {
        this.phaseCount = content.list.length
      }
    } else if (hasParagraphs && !hasBullets && !hasList) {
      this.type = 'text'
      if (itemize) {
        this.phaseCount = content.paragraphs.length
      }
    }
  }
}

export default function loadSlides (definitions) {
  const slides = definitions.map(d => new Slide(d))
  return {
    slides,
    slideNumbersById: slides.reduce((map, slide, idx) => {
      slide.ids.forEach(id => {
        map[id] = idx
      })
      return map
    }, {})
  }
}

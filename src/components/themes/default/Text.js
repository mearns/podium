const React = require('react')

export default function render ({ itemize, content: { title, paragraphs = [] }, phase = 0 }) {
  return (
    <section>
      <h1>{title}</h1>
      <ul>{
        paragraphs
          .filter((item, idx) => !itemize || idx <= phase)
          .map((item, idx) => (<p key={idx}>{item}</p>))
      }</ul>
    </section>
  )
}

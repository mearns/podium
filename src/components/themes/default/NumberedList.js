const React = require('react')

export default function render ({ itemize, content: { title, list = [] }, phase = 0 }) {
  return (
    <section>
      <h1>{title}</h1>
      <ol>{
        list
          .filter((item, idx) => !itemize || idx <= phase)
          .map((item, idx) => (<li key={idx}>{item}</li>))
      }</ol>
    </section>
  )
}

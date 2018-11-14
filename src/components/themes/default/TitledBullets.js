const React = require('react')

export default function render ({ title, bullets = [], location = 0 }) {
  return (
    <section>
      <h1>{title}</h1>
      <ul>{
        bullets
          .filter((item, idx) => idx <= location)
          .map((item, idx) => (<li key={idx}>{item}</li>))
      }</ul>
    </section>
  )
}

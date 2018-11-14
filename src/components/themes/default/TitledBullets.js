const React = require('react')

export default function render ({ title, bullets = [] }) {
  return (
    <section>
      <h1>{title}</h1>
      <ul>{
        bullets.map((item, idx) => (<li key={idx}>{item}</li>))
      }</ul>
    </section>
  )
}

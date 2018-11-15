import React from 'react'

export default function render ({ content: { title, paragraphs = [] } }) {
  return (
    <section>
      <h1>{title}</h1>
      {
        paragraphs.map((p, idx) => (<p key={idx}>{p}</p>))
      }
    </section>
  )
}

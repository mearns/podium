import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import SlideShow from './components/SlideShow'
import * as serviceWorker from './serviceWorker'
import slides from './my-presentation'
import loadSlides from './slides'

const props = loadSlides(slides)
console.log(props)
ReactDOM.render(<SlideShow {...props} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

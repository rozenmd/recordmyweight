import React from 'react'
import Media from 'react-media'

import Desktop from './components/Desktop'
import Mobile from './components/Mobile'

class Home extends React.Component {
  render() {
    return (
      <Media query="(min-width: 600px)">
        {matches => (matches ? <Desktop /> : <Mobile />)}
      </Media>
    )
  }
}

export default Home

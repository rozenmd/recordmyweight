import React from 'react'

import WeightOverTimeChart from './WeightOverTimeChart'

export default class Desktop extends React.Component {
  render() {
    return (
      // <div style={{ width: '80%', height: '100%' }}>
      <WeightOverTimeChart height={600} width={800} />
      // </div>
    )
  }
}

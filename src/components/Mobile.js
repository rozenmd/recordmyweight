import React from 'react'

import WeightOverTimeChart from './WeightOverTimeChart'

export default class Mobile extends React.Component {
  render() {
    return (
      // <div style={{ width: '80%', height: '100%' }}>
      <WeightOverTimeChart height={500} width={375} />
      // </div>
    )
  }
}

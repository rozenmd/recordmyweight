import React, { Fragment } from 'react'

import WeightOverTimeChart from './WeightOverTimeChart'
import { myData } from '../data'

export default class Desktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }
  componentDidMount() {
    // Your parse code, but not seperated in a function
    let reformattedData = myData.map(row => {
      return { weight: +row.weight, date: row.date.split(' ')[0] } //new Date(row.date).getTime() / 1000
    })
    this.setState({ data: reformattedData })
  }
  render() {
    const { data } = this.state
    if (data) {
      return <WeightOverTimeChart height={600} width={800} data={data} />
    } else {
      return <Fragment>Loading!</Fragment>
    }
  }
}

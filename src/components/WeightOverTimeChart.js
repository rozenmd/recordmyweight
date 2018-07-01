import React, { Fragment } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts'

import { myData } from '../data'

export default class WeightOverTimeChart extends React.Component {
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
    const { height, width } = this.props
    if (data) {
      console.log(this.state)
      return (
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 5, right: 40, bottom: 5, left: -30 }}
        >
          <Line type="monotone" dataKey="weight" stroke="red" dot={false} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            domain={['auto', 'auto']}
            padding={{ left: 10, right: 10 }}
            name="Date"
          />
          <YAxis dataKey="weight" name="Weight" domain={['auto', 'auto']} />

          <Tooltip />
          <Brush dataKey="date" startIndex={data.length - 40}>
            <AreaChart>
              <CartesianGrid />
              <YAxis hide domain={['auto', 'auto']} />
              <Area dataKey="weight" stroke="red" fill="red" dot={false} />
            </AreaChart>
          </Brush>
        </LineChart>
      )
    } else {
      return <Fragment>Nothing here yet!</Fragment>
    }
  }
}

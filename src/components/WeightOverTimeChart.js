import React from 'react'
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
} from 'recharts'

export default class WeightOverTimeChart extends React.Component {
  render() {
    const { height, width, data } = this.props

    console.log(this.props)
    return (
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 5, right: 40, bottom: 5, left: -20 }}
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
  }
}

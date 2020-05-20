import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const Chart = ({ posts }) => {
    return (
        <ResponsiveContainer width='100%' aspect={4.0/.75}>
        <LineChart  data={posts}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="objectID" angle={-90} textAnchor="end" interval={0} />
          <Tooltip />
          <YAxis />
          <Line type="monotone" dataKey="points" stroke="blue" dot={<circle stroke='red' strokeWidth={1} fill='red' />}/>
        </LineChart>
      </ResponsiveContainer>
    )
}

export default Chart

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  useEffect(() => { setData(() => getData()); }, [events]);

  const cellColors = [
    '#845EC2',
    '#FF6F91',
    '#FF9671',
    '#FFC75F',
    '#F9F871'
  ];

  return (
    <ResponsiveContainer height={400} >
      <PieChart width={400} height400>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={cellColors[index % cellColors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' align='center' />
      </PieChart>
    </ResponsiveContainer >
  );
}
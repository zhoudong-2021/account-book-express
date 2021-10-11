import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Sector,Legend, Cell, ResponsiveContainer } from 'recharts';
import propTypes from 'prop-types';


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



export default class PieCharts extends PureComponent {


  render() {
    const {data1, data2} = this.props;
    return ( 
      <div className="mx-auto" style={{width:800}}>  
      {(data1.length === 0 && data2.length === 0)?
        <div className="alert alert-light text-center fs-5">
          There is no record.
        </div> : ""}
      {data1.length!==0 && 
        <PieChart width={800} height={350}
        margin={{top:50}}>
        
          <Pie
            data={data1}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}    
            fill="#8884d8"
            dataKey="value"
            nameKey="name" 
          >
            {data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>        
          <Tooltip />
          <Legend verticalAlign="top" height={30}  
          />
        </PieChart> }

         <PieChart width={800} height={350} margin={{top:50}}>
         <Pie
            data={data2}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name" 
          >
            {data2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend verticalAlign="top" height={30}  
          />
        </PieChart>             
      </div>
    );
  }
}

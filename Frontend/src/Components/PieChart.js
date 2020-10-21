import React,{useContext} from 'react'
import{ PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { TransactionContext } from "../Context/TransactionState";

export const PieCh = () => {
    const context = useContext(TransactionContext);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#8af542', '#8442f5', '#42f5ef','#ff0000'];

      const res = Array.from(context.transactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, amount]) => ({category, amount}));
      
      console.log(res);


      let renderLabel = function(entry){
          return entry.category;
      }

      // const RADIAN = Math.PI / 180;
      // const renderCustomizedLabel = ({
      //   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
      // }) => {
      //    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
      //   const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
      //   return (
      //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      //       {`${(percent * 100).toFixed(0)}%`}
      //     </text>
      //   );
      // };

    return (
    <React.Fragment>
        <h3>Breakdown of Expenses</h3>
        <PieChart width={800} height={400}>
        <Pie dataKey="amount" nameKey="category" data={res} outerRadius={150} fill="#8884d8" label={renderLabel}>
          {
            res.map((amount, category) => <Cell fill={COLORS[category % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip /> 
        <Legend verticalAlign="top" /> 
      </PieChart>
    </React.Fragment>
    )
}

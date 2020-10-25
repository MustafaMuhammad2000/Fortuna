import React,{useContext} from 'react'
import{ PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { TransactionContext } from "../Context/TransactionState";

export const PieCh = () => {
    const context = useContext(TransactionContext);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#8af542', '#8442f5', '#42f5ef','#ff0000'];

      const res = Array.from(context.transactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, amount]) => ({category, amount}));
      res.sort((a,b) => a.amount > b.amount ? 1: -1);
      console.log(res);
        

      let renderLabel = function(entry){
          return entry.category;
      }

    return (
    <React.Fragment>
        <h3 className="underline">Breakdown of Expenses</h3>
        <PieChart width={800} height={400}>
        <Pie data={res} dataKey="amount" nameKey="category" outerRadius={150} fill="#8884d8" label={renderLabel}>
          {
            res.map((amount,category) => <Cell fill={COLORS[category % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip /> 
        <Legend verticalAlign="top" /> 
      </PieChart>
    </React.Fragment>
    )
}

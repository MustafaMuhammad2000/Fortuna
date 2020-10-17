import React,{useContext} from 'react'
import{ PieChart, Pie, Tooltip } from 'recharts';
import { TransactionContext } from "../Context/TransactionState";

export const PieCh = () => {
    const context = useContext(TransactionContext);

      const res = Array.from(context.transactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, amount]) => ({category, amount}));

      let renderLabel = function(entry){
          return entry.category;
      }

    return (
    <React.Fragment>
        <h3>Breakdown of Expenses</h3>
        <PieChart width={500} height={400}>
        <Pie dataKey="amount" nameKey="category" data={res} cx={300} cy={200} outerRadius={140} fill="#8884d8" label={renderLabel}/>
        <Tooltip />
      </PieChart>
    </React.Fragment>
    )
}

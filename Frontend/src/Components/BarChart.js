import React,{useContext} from 'react'
import{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { TransactionContext } from "../Context/TransactionState";
export const BarCh = () => {
    const context = useContext(TransactionContext);

    const mapper = single => {
        let d = single.date.split('-');
        let p = Number(single.amount);
        return { yearmonth:d[0]+'-'+d[1], amount: p };
      }
      
      const reducer = (group, current) => {
        let i = group.findIndex(single => (single.yearmonth === current.yearmonth));
        if (i === -1) {
          return [ ...group, current ];
        }
      
        group[i].amount += current.amount;
        return group;
      };

    const sumAmounts = context.transactions.map(mapper).reduce(reducer,[]);
    sumAmounts.sort((a,b) => a.yearmonth > b.yearmonth ? 1: -1);
    console.log(sumAmounts);  


    return (
        <React.Fragment>
        <h3>Monthly Expenditure</h3>
        <BarChart width={750} height={350} data={sumAmounts}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="yearmonth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#ff0dbf" />
        </BarChart>
        </React.Fragment>
    )
}

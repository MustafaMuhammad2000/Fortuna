import React,{useContext} from 'react'
import{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import moment from 'moment';

import {AuthContext} from "../Context/auth-context"

import { TransactionContext } from "../Context/TransactionState";
export const BarCh = () => {
    const context = useContext(TransactionContext);
    const auth = useContext(AuthContext);

    const mapper = single => {
        let p = Number(single.amount);
        let d2 = moment(single.date).format('MMM YYYY');
        return { yearmonth:d2, amount: p };
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
    sumAmounts.sort((a,b) => moment(a.yearmonth).isAfter(b.yearmonth) ? 1: -1);
    console.log(sumAmounts);  
    return (
        <React.Fragment>
        <h3 className ="underline">Monthly Expenditure</h3>
        <BarChart width={750} height={350} data={sumAmounts}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="yearmonth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#ff0dbf" />
            <ReferenceLine y={auth.monthlylimit} label="Monthly Limit" stroke="red" strokeDasharray="3 3" />
        </BarChart>
        </React.Fragment>
    )
}

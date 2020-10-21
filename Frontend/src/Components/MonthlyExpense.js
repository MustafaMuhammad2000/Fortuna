import React,{useContext} from 'react'
import moment from 'moment';

import { MonthlyChart } from "./MonthlyChart";
import { LimitUpdate } from "./LimitUpdate";
import { AuthContext } from "../Context/auth-context"
import { TransactionContext } from "../Context/TransactionState";

export const MonthlyExpense = () => {
    const {transactions} = useContext(TransactionContext);
    const {monthlylimit} = useContext(AuthContext);
    const prevMonth = moment().add(-1, 'M').startOf('month').format('YYYY-MM-DD');
    const currMonth = moment().startOf('month').format('YYYY-MM-DD');
    const nextMonth = moment().add(1, 'M').startOf('month').format('YYYY-MM-DD');
    console.log(prevMonth);
    console.log(currMonth);
    console.log(nextMonth);

    const newtransactions = transactions.filter(transaction => transaction.date > currMonth && transaction.date < nextMonth);
    console.log(newtransactions);
    const prevtransactions = transactions.filter(transaction => transaction.date > prevMonth && transaction.date< currMonth);
    console.log(prevtransactions);


    const values = newtransactions.map((transaction) => transaction.amount);
    const total = values.reduce((prev, tot) => prev + tot, 0).toFixed(2);
    console.log(total);

    // let data = newtransactions.map(({category, amount}) => ({category, amount}));
    // let pastdata = prevtransactions.map(({category, amount}) => ({category, amount}));

    const data = Array.from(newtransactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, amount]) => ({category, amount}));

    const pastdata = Array.from(prevtransactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, Pamount]) => ({category, Pamount}));


      data.sort((a,b) => a.category > b.category ? 1: -1);
      pastdata.sort((a,b) => a.category > b.category ? 1: -1);
      
      console.log(data);
      console.log(pastdata);

    return (
            <React.Fragment>
            <h2>{moment(currMonth).format('MMM-YYYY')}</h2>
            <h3>Monthly Expenditure as of {moment().format('MMMM Do')} is {total}</h3>
            <LimitUpdate />
            <h3>Expenditure Habits</h3>
            <MonthlyChart data={data} total={total} pastdata={pastdata}/>
            </React.Fragment>
    )
}

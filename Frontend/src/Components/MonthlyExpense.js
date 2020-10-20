import React,{useContext} from 'react'
import moment from 'moment';

import { TransactionContext } from "../Context/TransactionState";

export const MonthlyExpense = () => {
    const {transactions} = useContext(TransactionContext);
    const temp = new Date();
    const currMonth = temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+"01"
    let nextMonth;
    if((temp.getMonth()+1) == 12){
         nextMonth = (temp.getFullYear()+1)+"-"+"01"+"-"+"01";
    } else{
         nextMonth = temp.getFullYear()+"-"+(temp.getMonth()+2)+"-"+"01";
    }
    console.log(currMonth);
    console.log(nextMonth);
    const newtransactions = transactions.filter(transaction => transaction.date > currMonth && transaction.date < nextMonth);
    console.log(newtransactions);
    const values = newtransactions.map((transaction) => transaction.amount);
    const total = values.reduce((prev, tot) => prev + tot, 0).toFixed(2);
    console.log(total);
    return (
        <div>
            <h2>For {moment(currMonth).format('MMM, YYYY')}</h2>
            <h3>Monthly Expenditure as of {moment(temp).format('DD MMM, YYYY')} is {total}</h3>
        </div>
    )
}

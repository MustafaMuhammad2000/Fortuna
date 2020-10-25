import React,{useContext, useEffect} from 'react'
import moment from 'moment';

import { MonthlyChart } from "./MonthlyChart";
import { LimitUpdate } from "./LimitUpdate";
import { AuthContext } from "../Context/auth-context"
import { TransactionContext } from "../Context/TransactionState";

export const MonthlyExpense = () => {
    const { transactions } = useContext(TransactionContext);
    const { monthlylimit } = useContext(AuthContext);
    
    const prevMonth = moment().add(-1, 'M').startOf('month').format('YYYY-MM-DD');
    const currMonth = moment().startOf('month').format('YYYY-MM-DD');
    const nextMonth = moment().add(1, 'M').startOf('month').format('YYYY-MM-DD');

    console.log(prevMonth);
    console.log(currMonth);
    console.log(nextMonth);

    const newtransactions = transactions.filter(transaction => transaction.date >= currMonth && transaction.date < nextMonth);
    console.log(newtransactions);
    const prevtransactions = transactions.filter(transaction => transaction.date >= prevMonth && transaction.date< currMonth);
    console.log(prevtransactions);


    const values = newtransactions.map((transaction) => transaction.amount);
    const total = values.reduce((prev, tot) => prev + tot, 0).toFixed(2);


    const data = Array.from(newtransactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, amount]) => ({category, amount}));

    const pastdata = Array.from(prevtransactions.reduce(
        (m, {category, amount}) => m.set(category, (m.get(category) || 0) + amount), new Map()
      ), ([category, Pamount]) => ({category, Pamount}));


      data.sort((a,b) => a.category < b.category ? 1: -1);
      pastdata.sort((a,b) => a.category < b.category ? 1: -1);
      
      console.log(data);
      console.log(pastdata);
      let balance = monthlylimit-total;
      let absolute = Math.abs(balance).toFixed(2);

      let currdata={name:"Current Month",FoodandDrinks:0,Travel:0,Shopping:0,Subscriptions:0,HousingandUtilities:0,Entertainment:0,HealthandWellness:0,Other:0};
      let pdata={name:"Past Month",FoodandDrinks:0,Travel:0,Shopping:0,Subscriptions:0,HousingandUtilities:0,Entertainment:0,HealthandWellness:0,Other:0}
      for(let i = 0; i<data.length; i++){
        if(data[i].category.trim() === "Food and Drinks"){
          currdata.FoodandDrinks=data[i].amount;
        }
        else if(data[i].category.trim() === "Travel"){
          currdata.Travel=data[i].amount;
        }
        else if(data[i].category.trim() === "Shopping"){
          currdata.Shopping=data[i].amount;
        }
        else if(data[i].category.trim() === "Subscriptions"){
          currdata.Subscriptions=data[i].amount;
        }
        else if(data[i].category.trim() === "Housing and Utilities"){
          currdata.HousingandUtilities=data[i].amount;
        }
        else if(data[i].category.trim() === "Health and Wellness"){
          currdata.HealthandWellness=data[i].amount;
        }
        else if(data[i].category.trim() === "Entertainment"){
          currdata.Entertainment=data[i].amount;
        }
        else if(data[i].category.trim() === "Other"){
          currdata.Other=data[i].amount;
        }
      }
      for(let i = 0; i<pastdata.length; i++){
        if(pastdata[i].category.trim() === "Food and Drinks"){
          pdata.FandD=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Travel"){
          pdata.Travel=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Shopping"){
          pdata.Shopping=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Subscriptions"){
          pdata.Subscriptions=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Housing and Utilities"){
          pdata.HousingandUtilities=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Health and Wellness"){
          pdata.HealthandWellness=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Entertainment"){
          pdata.Entertainment=pastdata[i].Pamount;
        }
        else if(pastdata[i].category.trim() === "Other"){
          pdata.Other=pastdata[i].Pamount;
        }
      }
      let alldata = [];
      alldata.push(pdata);
      alldata.push(currdata);
      console.log(alldata);
    return (
            <React.Fragment>
             <div className="inc-exp-container">
              <h1 className="h1v2" >{moment(currMonth).format('MMM YYYY')}</h1>
            </div>
            <div className="row">
              <div className="column">
                <div className="card">
                  <LimitUpdate />
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <h3 className="h3bold">Monthly Expenditure as of <b>{moment().format('MMMM Do')}</b> is <b>${total}</b></h3>
                </div>
              </div>
              <div className="column2">
                <div className={balance < 0 ? 'card2' : 'card'}>
                  { balance >= 0 &&
                  (<h3 className="h3bold">You are <b>{absolute} under</b> your monthly limit!</h3>)}
                  { balance < 0 &&
                  (<h3 className="h3bold">You are <b>{absolute} over</b> your monthly limit!</h3>)}
                </div>
              </div>   
            </div>
            <h3 className="underline">Expenditure Habits</h3>
            <MonthlyChart data={alldata}/>
            </React.Fragment>
    )
}

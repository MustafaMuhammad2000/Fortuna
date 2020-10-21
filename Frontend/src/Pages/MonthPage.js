import React,{useContext, useEffect} from 'react'
import { TransactionContext } from "../Context/TransactionState";
import {MonthlyExpense} from "../Components/MonthlyExpense"

export const MonthPage = () => {
    const context = useContext(TransactionContext);
    useEffect(() => {
     context.getTransactions();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <div className="test">
            <MonthlyExpense />
            </div>
        </React.Fragment>
    )
}

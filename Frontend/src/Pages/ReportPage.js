import React, {useContext, useEffect} from 'react'
import { TransactionContext } from "../Context/TransactionState";
import {PieCh} from '../Components/PieChart'
import {BarCh} from '../Components/BarChart'

export const ReportPage = () => {
    const context = useContext(TransactionContext);
    useEffect(() => {
        context.getTransactions();
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <React.Fragment>
            <div className="test">
                <PieCh />
                <BarCh />
            </div>
        </React.Fragment>
    )
}

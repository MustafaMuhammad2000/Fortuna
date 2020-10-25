import React,{useContext, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TransactionContext } from "../Context/TransactionState";
import {MonthlyExpense} from "../Components/MonthlyExpense"

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export const MonthPage = () => {
    const [loading, setLoading] = useState(false);
    const context = useContext(TransactionContext);
    const classes = useStyles();
    useEffect(() => {
     setLoading(true);
     context.getTransactions();
     setLoading(false)
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
            <div className="alignment">
            <MonthlyExpense />
            </div>
        </React.Fragment>
    )
}

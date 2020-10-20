import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import { TransactionContext } from "../Context/TransactionState";

const useStyles = makeStyles({
  root: {
    '& .header': {
      backgroundColor: 'rgba(66, 245, 117)',
    },
    '& .header2': {
      backgroundColor: 'rgba(66, 194, 245)',
    },
    '& .header3': {
      backgroundColor: 'rgba(245, 173, 66)',
    },
    '& .header4': {
      backgroundColor: 'rgba(245, 66, 147)',
    },
  },
});


export const ListofTransactions = () => {
  const {transactions, deleteTransaction, getTransactions} = useContext(TransactionContext);
  const [selectRows, setSelectedRows] = useState([]);
  const classes = useStyles();
  let i
  for(i = 0; i<transactions.length; i++){
    transactions[i].date = transactions[i].date.slice(0,10);
  }
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(transactions);
  const handleRowSelection = (selection) =>{
    setSelectedRows(selection.rows);
  }

  async function deleteSelected(){
    if(selectRows.length === 0){
      console.log("No Rows Selected")
      return;
    }
    let index = 0;
    for(index; index<selectRows.length; index++){
      await deleteTransaction(selectRows[index].id);
    }
  }
  return (
    <React.Fragment>
      <h3>Expense History</h3>
      <div style={{height: 325, width: '70%'}} className={classes.root}>
        <DataGrid
        columns={[ { field: 'category', width:185, headerClassName: 'header' }, { field: 'description', width:200,  headerClassName: 'header2' }, { field: 'amount', width:100, headerClassName: 'header3' }, { field: 'date', type: "date", width:300, headerClassName: 'header4' }]}
        rows={
              transactions
          }
        alignItems="flex-start"
        autoPageSize
        checkboxSelection
        onSelectionChange={handleRowSelection}
        />  
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={deleteSelected}
        style={{display: ((selectRows.length === 0) ? 'none' : 'block'), width: "50%"}} 
         >
        Delete Selected Expenses
      </Button>  
      </div>
    </React.Fragment>
  );
};

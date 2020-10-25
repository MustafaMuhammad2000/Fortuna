import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TransactionContext } from "../Context/TransactionState";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .header': {
      backgroundColor: '#77DD77',
    },
    '& .header2': {
      backgroundColor: '#FDFD98',
    },
    '& .header3': {
      backgroundColor: '#E1CEC9',
    },
    '& .header4': {
      backgroundColor: '#B29DD9',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export const ListofTransactions = () => {
  const {transactions, deleteTransaction, getTransactions} = useContext(TransactionContext);
  const [selectRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  let i
  for(i = 0; i<transactions.length; i++){
    transactions[i].date = transactions[i].date.slice(0,10);
  }
  useEffect(() => {
    setLoading(true);
    getTransactions();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRowSelection = (selection) =>{
    setSelectedRows(selection.rows);
  }

  async function deleteSelected(){
    if(selectRows.length === 0){
      console.log("No Rows Selected")
      return;
    }
    let index = 0;
    setLoading(true);
    for(index; index<selectRows.length; index++){
      await deleteTransaction(selectRows[index].id);
    }
    setLoading(false);
  }
  return (
    <React.Fragment>
      <h3 className="underline" >Expense History</h3>
      <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{height: 425, width: '60%'}} className={classes.root}>
        <DataGrid
        columns={[ { field: 'category', width:185, headerClassName: 'header' }, { field: 'description', width:200,  headerClassName: 'header2' }, { field: 'amount', width:100, headerClassName: 'header3' }, { field: 'date', type: "date", width:200, headerClassName: 'header4' }]}
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

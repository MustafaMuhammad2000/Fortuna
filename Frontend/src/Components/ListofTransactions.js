import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { TransactionContext } from "../Context/TransactionState";


export const ListofTransactions = () => {
  const {transactions, deleteTransaction, getTransactions} = useContext(TransactionContext);
  const [selectRows, setSelectedRows] = useState([]);
  useEffect(() => {
    getTransactions();
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
    for(index; index<selectRows.length; index++){
      await deleteTransaction(selectRows[index].id);
    }
  }
  console.log(selectRows);
  return (
    <React.Fragment>
      <h3>Expense History</h3>
      <div style={{height: 325, width: '100%'}}>
        <DataGrid
        columns={[ { field: 'category', width:185 }, { field: 'description', width:200 }, { field: 'amount', width:100 }, { field: 'date', type: 'date', width:300 }]}
        rows={
              transactions
          }
        alignItems="flex-start"
        autoPageSize
        checkboxSelection
        onSelectionChange={handleRowSelection}
        />  
        <div style={{
          display: 'flex',
        alignItems: 'center'
      }}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={deleteSelected}
        style={{display: ((selectRows.length === 0) ? 'none' : 'block'), width: "50%"}} 
        startIcon={<DeleteIcon />} >
        Delete Selected Expenses
      </Button>  
      </div>
      </div>
    </React.Fragment>
  );
};

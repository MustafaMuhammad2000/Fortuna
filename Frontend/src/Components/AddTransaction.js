import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import moment from 'moment';

import { TransactionContext } from "../Context/TransactionState";
import uuid from "react-uuid";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  big: {
    width: '70%',
    marginBottom:'15px',
  },
  medium: {
    width: "50%",
    marginBottom:'15px',
  },
  small:{
    width: "30%",
    marginBottom:'15px'
  },
  button:{
    marginTop: '45px',
    width: "50%",
    background: '#00cb98',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 50px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const AddTransaction = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [months, setMonths] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const { addTransaction } = useContext(TransactionContext);
  const { enqueueSnackbar } = useSnackbar();

  
  const openAdd = () =>{
      setShowAdd(true);
  }
  const closeAdd = () =>{
      setShowAdd(false);
      setDescription("");
      setAmount("");
      setCategory("");
      setDate("");
      setRecurring(false);
  }

    const onSubmit = async (e) => {
    if(!description || !amount || !category || !date){
      enqueueSnackbar("Invalid input", {
        variant: 'error',
        autoHideDuration: 1500,
      });
      return;
    }
    if (amount < 0) {
      enqueueSnackbar("Please enter a positive amount", {
        variant: 'error',
        autoHideDuration: 1500,
      });
      return;
    }

    if(!recurring){
      const newTransaction = {
        id: uuid(),
        description,
        amount: parseFloat(amount),
        category,
        date,
      };
      setLoading(true);
      addTransaction(newTransaction);
      setDescription("");
      setAmount("");
      setCategory("");
      setDate("");
      setLoading(false);
      setShowAdd(false);
    }
    else if(recurring){
      if((months < 1) || (months >12) || (!months)){
        enqueueSnackbar("Invalid number of months", {
          variant: 'error',
          autoHideDuration: 1500,
        });
        return;
      }
      setLoading(true);
      let i;
      for(i=0; i<months; i++){
        const newTransaction = {
          id: uuid(),
          description,
          amount: parseFloat(amount),
          category,
          date: moment(date).add(i, 'M').format('YYYY-MM-DD'),
        };
        await addTransaction(newTransaction);
        console.log(newTransaction);
      }
      setDescription("");
      setAmount("");
      setCategory("");
      setDate("");
      setRecurring(false);
      setMonths("");
      setLoading(false);
      setShowAdd(false);
    }
  };

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={openAdd} variant="contained" color="primary" >Add Transaction</Button> 
      <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={showAdd} fullWidth={true} maxWidth={'sm'} aria-labelledby="addtransaction-dialog-title" >
      <DialogContent className={classes.root} >
      <DialogTitle id="form-dialog-title">Add a new expense</DialogTitle>
          <InputLabel htmlFor="filled-adornment-description">Description</InputLabel>
          <OutlinedInput
            id="filled-adornment-description"
            className={classes.big}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputLabel id="demo-simple-select-placeholder-label-category">Category</InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-category"
            className={classes.big}
            variant="outlined"
            id="demo-simple-select-placeholder-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Food and Drinks"}>Food and Drinks</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Shopping"}>Shopping</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            <MenuItem value={"Housing and Utilities"}>Housing and Utilities</MenuItem>
            <MenuItem value={"Entertainment"}>Entertainment </MenuItem>
            <MenuItem value={"Health and Wellness"}>Health and Wellness</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="filled-adornment-amount"
            className={classes.medium}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <InputLabel id="demo-simple-select-placeholder-label-date">Date</InputLabel> 
        <OutlinedInput
              id="filled-adornment-date"
              className={classes.medium}
              label="date"
              type="date"
              value={date}
              required pattern= "\d{4}-\d{2}-\d{2}"
              onChange={(e) => setDate(e.target.value)}
            />
        <InputLabel id="demo-simple-select-placeholder-label-category2">Recurring Monthly Payment</InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-category2"
            className={classes.small}
            variant="outlined"
            id="demo-simple-select-placeholder-category2"
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
            defaultValue={false}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
        </Select>   
        {recurring && 
        (<InputLabel htmlFor="filled-adornment-months">Number of Months</InputLabel>)
        }
        {recurring && (
          <OutlinedInput
            id="filled-adornment-months"
            className={classes.medium}
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
          )
        }
        {recurring && 
        (<FormHelperText>Max 12 Months</FormHelperText>)
        }
      </DialogContent>
      <DialogActions>
            <Button onClick={onSubmit} color="primary">Add</Button>
            <Button onClick={closeAdd} color="primary">Cancel</Button>
        </DialogActions>
    </Dialog>
    </React.Fragment>
  );
};

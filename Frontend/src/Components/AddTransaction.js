import React, { useState, useContext } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { TransactionContext } from "../Context/TransactionState";
import uuid from "react-uuid";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "50%",
    '& label.Mui-focused': {
      borderBottomColor: 'green',
      color: 'green',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "30ch"
  },
  select: {
    width: "30ch"
  },
  date: {
    width: "30ch"
  },
  button:{
    background: '#00cb98',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
}));

export const AddTransaction = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [displayErrors, setdisplayErrors] = useState(false);
  const { addTransaction } = useContext(TransactionContext);


  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setdisplayErrors(true);
      return;
    }
    if (amount < 0) {
      setdisplayErrors(true);
      setAmount("");
      return;
    }
    if (category === "") {
      return;
    }

    const newTransaction = {
      id: uuid(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    };
    console.log(date);
    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
    setdisplayErrors(false);
  };

  return (
    <React.Fragment>
      <h3>Add a new expense</h3>
      <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
      >
      <div style={{ width: '100%'}}>
      <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-description">Enter Description</InputLabel>
          <FilledInput
            id="filled-adornment-description"
            className={classes.textField}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // inputProps={{style: {fontSize: 23.5}}} // font size of input text
            // InputLabelProps={{style: {fontSize: 23.5}}} // font size of input label
          />
        <FormHelperText id="description-helper-text">E.g Uber Ride</FormHelperText>
      </FormControl>
      <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel shrink id="demo-simple-select-placeholder-label-category">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-category"
            className={classes.select}
            id="demo-simple-select-placeholder-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Food and Drinks"}>Food and Drinks</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Shopping"}>Shopping</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            <MenuItem value={"Housing and Utilties"}>Housing and Utilties</MenuItem>
            <MenuItem value={"Entertainment"}>Entertainment </MenuItem>
            <MenuItem value={"Health and Wellness"}>Health and Wellness</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
      </FormControl>
      <FormControl  required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Enter Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            className={classes.textField}
            label="number"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <FormHelperText id="description-helper-text">E.g 17.32</FormHelperText>
      </FormControl>
      <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
        <FilledInput
              id="filled-adornment-date"
              className={classes.date}
              label="date"
              type="date"
              value={date}
              required pattern= "\d{4}-\d{2}-\d{2}"
              onChange={(e) => setDate(e.target.value)}
            />
        <FormHelperText id="description-helper-text">E.g 2020-10-16</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={clsx(classes.margin)} >
          <Button className={classes.button} type="submit" variant="contained" color="primary" >Add Transaction</Button>  
      </FormControl> 
        </div>
      </form>
    </React.Fragment>
  );
};

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
    width: '100ch'
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '35ch',
  },
  select: {
    width: '35ch',
  },
  date: {
    width: '35ch'
  },
  button:{
    width: '72ch'
  }
}));

export const AddTransaction = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [displayErrors, setdisplayErrors] = useState();
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
      <div>
      <FormControl required error={displayErrors} className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-description">Enter Description</InputLabel>
          <FilledInput
            id="filled-adornment-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{style: {fontSize: 23.5}}} // font size of input text
            InputLabelProps={{style: {fontSize: 23.5}}} // font size of input label
          />
        <FormHelperText id="description-helper-text">E.g Uber Ride</FormHelperText>
      </FormControl>
      <FormControl required error={displayErrors} className={clsx(classes.margin, classes.select)} variant="filled">
          <InputLabel shrink id="demo-simple-select-placeholder-label-category">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-category"
            id="demo-simple-select-placeholder-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Food and drinks"}>Food and drinks</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
            <MenuItem value={"Clothes or accessories"}>Clothes or accessories</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            <MenuItem value={"Rent"}>Rent</MenuItem>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
      </FormControl>
      <FormControl  required error={displayErrors} className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Enter Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            label="number"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            inputProps={{style: {fontSize: 23.5}}} // font size of input text
            InputLabelProps={{style: {fontSize: 23.5}}} // font size of input label
          />
          <FormHelperText id="description-helper-text">E.g $17.32</FormHelperText>
      </FormControl>
      <FormControl required error={displayErrors} className={clsx(classes.margin, classes.date)} variant="filled">
        <FilledInput
              id="filled-adornment-date"
              label="date"
              type="date"
              value={date}
              required pattern= "\d{4}-\d{2}-\d{2}"
              onChange={(e) => setDate(e.target.value)}
            />
        <FormHelperText id="description-helper-text">E.g 2020-10-16</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={clsx(classes.margin, classes.button)} >
          <Button type="submit" variant="contained" color="primary" >Add Transaction</Button>  
      </FormControl> 
        </div>
      </form>
    </React.Fragment>
  );
};

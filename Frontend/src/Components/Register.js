import React, {useState, useContext} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {AuthContext} from '../Context/auth-context'
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '35ch'
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '35ch',
    height: 60
  },
  button: {
    width: '40ch',
    background: 'linear-gradient(45deg, #00cb98 42%, #00d4ff 97%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
}));

export const Register = () => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [displayErrors, setdisplayErrors] = useState(false);

    
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
          setdisplayErrors(true);
          return;
        }
        if(password !== confirmpassword){
            setdisplayErrors(true)
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            return
        }
        try{
          const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: username,
              password: password
            })
          });

          const responseData = await response.json();
          if(!response.ok){
            throw new Error(responseData.message);
          }
          console.log(responseData);
          console.log("Sign up worked");
          setUsername("");
          setPassword("");
          setConfirmPassword("")
          setdisplayErrors(false);
          auth.login(responseData.userId, responseData.token);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <React.Fragment>
        <h3>Make an account to record purchases</h3>
        <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
          <div>
          <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
          <FilledInput
            id="filled-adornment-username"
            className={classes.textField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl required error={displayErrors} className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-confirmpassword">Confirm Password</InputLabel>
          <FilledInput
            id="filled-adornment-confirmpassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth className={clsx(classes.margin)} >
          <Button type="submit" variant="contained" color="primary" className={classes.button} >Create Account</Button>  
        </FormControl> 
        </div>    
        </form>
        </React.Fragment>
    )
}

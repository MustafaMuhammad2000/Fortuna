import React, {useState, useContext} from 'react'
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

import {AuthContext} from '../Context/auth-context'

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Register = () => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("")
    const [monthlylimit, setMonthlylimit] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [displayErrors, setdisplayErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
          setdisplayErrors(true);
          return;
        }
        if(password.length < 5 ){
          setPassword("");
          enqueueSnackbar('Password must be at least 5 characters', {
            variant: 'error',
            autoHideDuration: 2000,
          });
          return
        }
        if(password !== confirmpassword){
            setdisplayErrors(true)
            setPassword("");
            setConfirmPassword("");
            enqueueSnackbar('Passwords do not match', {
              variant: 'error',
              autoHideDuration: 2000,
            });
            return
        }
        if(monthlylimit < 0){
          setdisplayErrors(true);
          setMonthlylimit("");
          enqueueSnackbar('Invalid expenditure goal', {
            variant: 'error',
            autoHideDuration: 2000,
          });
          return;
        }
        try{
          setLoading(true);
          const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: username,
              password: password,
              monthlylimit: monthlylimit
            })
          });

          const responseData = await response.json();
          if(!response.ok){
            throw new Error(responseData.message);
          }
          console.log(responseData);
          setUsername("");
          setPassword("");
          setConfirmPassword("")
          setMonthlylimit("");
          setdisplayErrors(false);
          setLoading(false);
          enqueueSnackbar(responseData.message, {
            variant: 'success',
            autoHideDuration: 2000,
          });
          auth.login(responseData.userId, responseData.token, responseData.monthlylimit, responseData.name);
        } catch (error) {
          setLoading(false);
          enqueueSnackbar(error.message, {
            variant: 'error',
            autoHideDuration: 2000,
          });
          console.log(error);
        }
      };
    return (
        <React.Fragment>
        <h3>Make an account to record purchases</h3>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </FormControl>
        <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
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
        <FormHelperText>Password must be at least 5 characters</FormHelperText> 
        </FormControl>
        <FormControl required error={displayErrors} className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-confirmpassword">Confirm Password</InputLabel>
          <FilledInput
            id="filled-adornment-confirmpassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
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
        <FormControl required error={displayErrors} className={clsx(classes.margin)} variant="filled">
          <InputLabel htmlFor="filled-adornment-limit">Monthly Expenditure Goal</InputLabel>
          <FilledInput
            id="filled-adornment-limit"
            label="number"
            type="number"
            className={classes.textField}
            value={monthlylimit}
            onChange={(e) => setMonthlylimit(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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

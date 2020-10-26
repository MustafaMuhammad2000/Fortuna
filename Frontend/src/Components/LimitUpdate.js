import React,{useContext, useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthContext } from "../Context/auth-context"


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export const LimitUpdate = () => {
    const[limit, setLimit] = useState("");
    const[showUpdate, setShowUpdate] = useState(false);
    const[loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const auth = useContext(AuthContext);
    const classes = useStyles();

    const openUpdate = () =>{
        setShowUpdate(true);
    }
    const closeUpdate = () =>{
        setShowUpdate(false);
    }

    const onSubmit = async (e) => {
        if (limit < 0 || !limit) {
          setLimit("");
          enqueueSnackbar("Invalid input", {
            variant: 'error',
            autoHideDuration: 1500,
          });
          return;
        }
        try{
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/transactions/limit', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+auth.token
              },
              body: JSON.stringify({
                monthlylimit: limit
              })
            });
            const responseData = await response.json();
            if(!response.ok){
              throw new Error(responseData.message);
            }
            console.log(responseData);
            setLimit("");
            enqueueSnackbar(responseData.message, {
              variant: 'success',
              autoHideDuration: 2000,
            });
            auth.monthlylimit = limit;
            changeStorage(limit);
            setLoading(false);
            closeUpdate();
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(error.message, {
              variant: 'error',
              autoHideDuration: 2000,
            });
            console.log(error);

        }
    }

    const changeStorage = (newlimit) =>{
        let storage = JSON.parse(localStorage.userData);
        storage.monthlylimit = parseFloat(newlimit);
        localStorage.setItem('userData', JSON.stringify(storage));
    }
    return (
        <React.Fragment>
        <h3 className="h3bold">Monthly limit is <b>${auth.monthlylimit}</b></h3>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Button onClick={openUpdate} variant="contained" color="primary" size="small">Change limit</Button>
        <Dialog open={showUpdate} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Set new monthly expenditure limit</DialogTitle>
        <DialogContent className={classes.root} >
            <InputLabel id="monthly limit">
            New Limit
           </InputLabel>
            <OutlinedInput
                autoFocus
                type="number"
                fullWidth
                size="small"
                style={{padding:"5px"}}
                onChange={(e) => {setLimit(e.target.value)}}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onSubmit} color="primary">Update</Button>
            <Button onClick={closeUpdate} color="primary">Cancel</Button>
        </DialogActions>
    </Dialog>
    </React.Fragment>
    )
}

import React,{useContext, useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useSnackbar } from 'notistack';

import { AuthContext } from "../Context/auth-context"
export const LimitUpdate = () => {
    const[limit, setLimit] = useState("");
    const[showUpdate, setShowUpdate] = useState(false);
    const [displayErrors, setdisplayErrors] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const auth = useContext(AuthContext);

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
            const response = await fetch('http://localhost:5000/api/transactions/limit', {
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
            setdisplayErrors(false);
            enqueueSnackbar(responseData.message, {
              variant: 'success',
              autoHideDuration: 2000,
            });
            auth.monthlylimit = limit;
            changeStorage(limit);
            closeUpdate();
        } catch (error) {
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
        <h3>Value Of Monthly goal is {auth.monthlylimit}</h3>
        <Button onClick={openUpdate} variant="contained" color="secondary">Update Goal</Button>
        <Dialog open={showUpdate} aria-labelledby="form-dialog-title" >
        <DialogContent >
            <DialogContentText>
                Set new monthly expenditure goal
            </DialogContentText>
            <InputLabel shrink id="monthly limit">
            New Goal
           </InputLabel>
            <OutlinedInput
                autoFocus
                className="monthly limit"
                type="number"
                fullWidth
                size="small"
                style={{padding:"5px"}}
                onChange={(e) => {setLimit(e.target.value)}}
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

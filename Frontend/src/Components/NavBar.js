import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import {AuthContext} from '../Context/auth-context'
const useStyles = makeStyles((theme) => ({
  root:{
    marginBottom: 12
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12
  }
}));

export const NavBar = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" style={{background: '#00cb98'}}>
          <Toolbar>
            {!auth.isLoggedIn &&
            (<Link to="/" style={{color: 'white', textDecoration: 'none'}}>About Fortuna</Link>)
            }
            {auth.isLoggedIn &&
              <h3 style={{color: 'white', fontWeight:"normal"}}>Welcome {auth.name}!</h3>
            }
            <section className={classes.rightToolbar}>
                {!auth.isLoggedIn &&
                (
                <Link to="/login" style={{color: 'white', textDecoration: 'none',  marginRight: 15}}>Login</Link>
                )
                }
                {!auth.isLoggedIn &&
                (
                <Link to="/register" style={{color: 'white', textDecoration: 'none',  marginRight: 15}}>Create Account</Link>
                )
                }
                {auth.isLoggedIn &&
                (
                <Link to="/transactions" style={{color: 'white', textDecoration: 'none', marginRight: 15}}>My Transactions</Link>
                )
                }
                {auth.isLoggedIn &&
                (
                <Link to="/month" style={{color: 'white', textDecoration: 'none', marginRight: 15}}>Month at a Glance</Link>
                )
                }
                {auth.isLoggedIn &&
                (
                <Link to="/report" style={{color: 'white', textDecoration: 'none', marginRight: 25}}>Generate Report</Link>
                )
                }
                {auth.isLoggedIn &&
                (<Button onClick={auth.logout}  variant="contained" color="secondary" style={{color:'white'}}>
                  Logout
                </Button>)
                }
            </section>
          </Toolbar>
        </AppBar>
      </div>

    </React.Fragment>
  );
};

import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { NavLinks } from "./NavLinks";

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
        <AppBar position="static" style={{background: '#00cb98' /*'linear-gradient(45deg, #00cb98 42%, #00d4ff 97%)' */}}>
          <Toolbar>
            <Button className={classes.menuButton}>
            <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Fortuna</Link>
            </Button>
            <section className={classes.rightToolbar}>
                {!auth.isLoggedIn &&
                (<Button>
                <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link>
                </Button>)
                }
                {!auth.isLoggedIn &&
                (<Button>
                <Link to="/register" style={{color: 'white', textDecoration: 'none'}}>Create Account</Link>
                </Button>)
                }
                {auth.isLoggedIn &&
                (<Button>
                <Link to="/transactions" style={{color: 'white', textDecoration: 'none'}}>My Transactions</Link>
                </Button>)
                }
                {auth.isLoggedIn &&
                (<Button>
                <Link to="/report" style={{color: 'white', textDecoration: 'none'}}>Generate Report</Link>
                </Button>)
                }
                {auth.isLoggedIn &&
                (<Button onClick={auth.logout} style={{color:'white'}}>
                  Logout
                </Button>)
                }
            </section>
          </Toolbar>
        </AppBar>
      </div>
      
      {/* <nav className="NavBar">
        <Link to="/">Fortuna</Link>
        <nav>
          <NavLinks />
        </nav>
      </nav> */}

    </React.Fragment>
  );
};

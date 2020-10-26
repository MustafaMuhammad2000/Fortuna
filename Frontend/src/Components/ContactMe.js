import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    button:{
      width: "100%",
      background: '#00cb98',
      borderRadius: 25,
      color: 'white',
      height: 48,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      marginBottom:'10px'
    },  
    close:{
        position: 'absolute',
        right: '20px',
    },
    screen:{
        background: '#00cb98',
    }
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const ContactMe = () =>{
    const classes = useStyles();
    const [showContact,setShowContact] = useState(false);

    const openUpdate = () =>{
        setShowContact(true);
    }
    const closeUpdate = () =>{
        setShowContact(false);
    }

    return (
        <React.Fragment>
        <div className="Bottom">
         <div className="Right">
        <Button variant="contained" color="primary" className={classes.button} onClick={openUpdate}>Contact Me</Button>
         </div>
         <Dialog fullScreen open={showContact}  TransitionComponent={Transition}>
         <AppBar style={{background: '#00cb98'}}>
          <Toolbar>
            <Typography variant="h6">
              Contact Me
            </Typography>
            <IconButton className={classes.close} color="inherit" onClick={closeUpdate} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{paddingTop:'70px', paddingLeft:'10px'}}>
            <h3 className="Contact">Hey its me, Mustafa Muhammad the creator of Fortuna! I had a lot of fun making this website and hope you find it useful</h3>
            <h3 className="Contact">To contact me regarding the website email me at: <b>fortunaquestions@gmail.com</b></h3>
            <h3 className="Contact">You can also learn more about me and see my other projects at: <a href="https://mustafamuhammad2000.github.io/"><b>mustafamuhammad2000.github.io</b></a></h3>
         </div>  
        </Dialog>
        </div>
        </React.Fragment>
    );
};
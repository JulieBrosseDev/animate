import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor:'#80cbc4',
      color: 'black'

    }
  }
}));
   
  export default function ButtonForm({chooseFilters}) {
    const classes = useStyles();
    
    
    return (
      <div className={classes.root} >
        
        <Button variant="outlined"   id={'animate'} onClick={chooseFilters}>
        ANÍMATE!
        </Button>
       </div>
     
    );
  } 
  
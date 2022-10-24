import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { FcBullish } from "react-icons/fc";
import logo from '.././src_assets/inflearn_logo.png'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Link,
    Breadcrumbs
  } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  hr: {
    border: 0,
    background: "#c8c8c8",
    height: "0.5px"
  },
  content: {
    paddingTop: theme.spacing(2)
  },
  typography: {
    // paddingRight: theme.spacing(2)
  }
}));

const EduListHeader = (props) => {
  const classes = useStyles();
  const { title } = props;
  const breadcrumbs = [
    <Typography key="4">
      {title}
    </Typography>
  ];
  return (   
    <React.Fragment>
      <div>
        <Typography variant="h4" className={classes.typography}>
            <FcBullish size={30}></FcBullish> {props.title} 
            <img src={logo} style={{paddingTop:'15px', width:'150px', height:'50px'}}></img>
        </Typography>
      </div>
      <div className={classes.content}>
        <hr className={classes.hr} />
      </div>
    </React.Fragment>
  );
};

export default EduListHeader
import React, { useEffect, useState } from "react";

import { FcNext } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";


import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@material-ui/core";


type PropsType ={
  data:any
}
const EduList5to10=({ data }: PropsType )=>{
    const [eduData,setEdudata]= React.useState([data]); 
    
    useEffect(()=>{
      setEdudata(data)
    },[data])
    
    return (
    <div className="eduNameList">
      {eduData && eduData.map((eduData) =>(
        <>  
          <Card elevation={5}>
            <div style={{paddingLeft: '15px', paddingTop: '5px'}}><h4>{eduData.seq}위</h4></div>
            <CardHeader title={eduData.eduName}/>
            <CardContent>
              <div style={{float: 'left', paddingBottom: '15px'}}>
                <Typography variant="body1" component="p">
                  <AiOutlineUser></AiOutlineUser> &nbsp; <b> {eduData.eduAuthor}</b><br/>  
                  <GiMoneyStack></GiMoneyStack> &nbsp; <b> {eduData.eduCost}</b><br/>
                  <AiOutlineComment></AiOutlineComment> &nbsp; <b> {eduData.eduReview}</b><br/>
                </Typography>
              </div>
              <div style={{float: 'right'}}>
                <CardActions style={{float: 'right', paddingRight: '15px'}}>
                  <Button onClick={() => window.open(eduData.eduLink, '_blank')} variant="contained" color="primary">
                    교육 바로가기
                  </Button>
                </CardActions>
              </div>
            </CardContent>
          </Card>
          <br/><br/>
        </>
      ))}
    </div>
    );
};

export default EduList5to10
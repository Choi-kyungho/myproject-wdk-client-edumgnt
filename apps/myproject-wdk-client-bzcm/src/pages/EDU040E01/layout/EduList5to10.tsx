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
    <div className="eduNameList" style={{marginTop:'220px'}}>
      {eduData && eduData.map((eduData) =>(
        <>  
          <Card style={{ width:'90%', marginLeft:'53px', height: '100px',
          boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 1px 1px, rgb(0 0 0 / 14%) 1px 1px 0px 2px, rgb(0 0 0 / 12%) 1px 1px 3px 0px'
          }}>
          <div style={{paddingLeft: '15px', paddingTop: '10px', float:'left'}}>
            <p style={{fontSize:'20px', float:'left', paddingTop:'8px'}}><b>{eduData.seq}위</b></p>
          </div>
          <div style={{fontSize:'14px', width: '430px',paddingTop:'40px', paddingLeft:'100px'
                      , color:'#464646', float:'left', fontWeight:'600', height:'100px', textAlign:'left'}}>
            {eduData.eduName}
          </div>
          <div style={{float:'left', paddingTop: '40px', paddingLeft: '100px', color:'#464646'}}>
            <AiOutlineUser></AiOutlineUser> &nbsp; {eduData.eduAuthor}
          </div>
          <div style={{float:'left', paddingTop: '40px', paddingLeft: '50px', color:'#464646'}}>
            <GiMoneyStack></GiMoneyStack> &nbsp; {eduData.eduCost}
          </div>
          <div style={{float:'right', paddingTop: '30px', paddingRight: '20px'}}>
            <Button onClick={() => window.open(eduData.eduLink, '_blank')} variant="contained" color="primary">
              바로가기
            </Button>
          </div>
            {/* <CardHeader title={eduData.eduName} style={{color:'#464646', fontSize:'20px', fontWeight:'700', paddingBottom: '40px'}}/>
            <CardContent>
              <div style={{float: 'left', paddingBottom: '15px'}}>
                <Typography variant="body1" component="p">
                  <AiOutlineUser></AiOutlineUser> &nbsp; {eduData.eduAuthor}<br/>  
                  <GiMoneyStack></GiMoneyStack> &nbsp; {eduData.eduCost}<br/>
                  <AiOutlineComment></AiOutlineComment> &nbsp; {eduData.eduReview}<br/>
                </Typography>
              </div>
              <div style={{float: 'right'}}>
                <CardActions style={{float: 'right', paddingRight: '15px'}}>
                  <Button onClick={() => window.open(eduData.eduLink, '_blank')} variant="contained" color="primary">
                    교육 바로가기
                  </Button>
                </CardActions>
              </div>
            </CardContent> */}
          </Card>
          <br/><br/>
        </>
      ))}
    </div>
    );
};

export default EduList5to10
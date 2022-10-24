import React, { useEffect, useState } from "react";

import { FcNext } from "react-icons/fc";
import { FaMedal } from "react-icons/fa";
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
const EduList1to5=({ data }: PropsType )=>{
    const [eduData,setEdudata]= React.useState([data]); 
    
    useEffect(()=>{
      setEdudata(data)
    },[data])
    
    return (    
    <div className="eduNameList">
      {eduData && eduData.map((eduData) =>(
        <>  
          <Card style={{width:'350px', float:'left', marginLeft: '30px', height:'250px'
             ,boxShadow: '5px 5px 1px -1px rgb(0 0 0 / 20%), 1px 1px 0px 2px rgb(0 0 0 / 14%), 1px 1px 3px 0px rgb(0 0 0 / 12%)'}}>
            <div style={{paddingLeft: '15px', paddingTop: '20px'}}>
              <p style={{fontSize:'25px', float:'left', paddingTop:'8px'}}>
                <div style={eduData.seq == 1 ? {color:'gold', float:'left'} 
                          : eduData.seq == 2 ? {color:'silver', float:'left'} 
                                             : {color:'#A47C6D', float:'left'}}>
                  <FaMedal></FaMedal></div>
                <div style={{float: 'left'}}><b style={{marginLeft:'5px'}}>{eduData.seq}위</b></div>
              </p>
            </div>
            <div style={{fontSize:'14px', paddingTop:'45px', color:'#464646', textAlign:'center', fontWeight:'600', height:'100px'}}>
              {eduData.eduName}
            </div>
            <div style={{float: 'left', marginTop:'10px', textAlign:'left', paddingLeft:'15px'}}>
              <AiOutlineUser></AiOutlineUser> &nbsp; {eduData.eduAuthor}<br/> 
            </div>
            <div style={{marginTop:'40px', textAlign:'left', paddingLeft:'15px', marginBottom:'10px'}}>
              <GiMoneyStack></GiMoneyStack> &nbsp; {eduData.eduCost}<br/>
            </div>
            <div style={{textAlign:'center', marginTop:'0px'}}>
              <CardActions style={{display:'block', marginBottom:'10px'}}>
                <Button onClick={() => window.open(eduData.eduLink, '_blank')} variant="contained" color="primary">
                  바로가기
                </Button>
              </CardActions>
            </div>
          </Card>
        </>
      ))}
    </div>
    );
};

export default EduList1to5
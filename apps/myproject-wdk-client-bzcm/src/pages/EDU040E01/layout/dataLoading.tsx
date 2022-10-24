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
const dataLoading=()=>{
    
    return (
    <div style={{textAlign:'center', marginTop:'10%'}}>
      <p style={{fontSize: '20px'}}>데이터를 수집중입니다. 잠시만 기다려주세요.</p>
    </div>
    );
};

export default dataLoading
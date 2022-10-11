import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import EduList from './layout/EduList';

type Props = {}

const EDU040E01 = () => {

  const [, fetchRequest] = useSyncHttpCient<IResData>();
  const apiCall = new ApiCall(fetchRequest);
  const [crawlingData, setCrawlingData] = useState([]);



  React.useEffect(()=>{
    const searchValue = 'N'
    apiCall.retrieve(searchValue).then(response=>{
      console.log("apiCall~123123!!!!!!!!!!!!!!"+JSON.stringify(response.data));
      setCrawlingData(response.data);
    });
  },[])


  return (
    // <div>{crawlingData}</div>
    <EduList data={crawlingData}></EduList>
  )
}

export default EDU040E01;
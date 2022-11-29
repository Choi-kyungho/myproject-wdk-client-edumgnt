import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import ApiCall from './action/api';
import EduList1to5 from './layout/EduList1to5';
import EduList5to10 from './layout/EduList5to10';
import EduListHeader from './layout/EduListHeader';
import DataLoading from './layout/dataLoading';
import styled from 'styled-components';
import {
  CircularProgress,
  Box
} from "@material-ui/core";

const MainContent = styled.section`
  width: 100%;
  height: 100%;
  padding-top: 2%;
  padding-left: 2%;
  padding-right: 2%;
`;

const TopContent = styled.section`
  padding-top: 10px;
  padding-left: 1%;
  padding-right: 1%;
`;

const BottomContent = styled.section`
  padding-top: 20px;
  margin-top: 40px;
`;

type Props = {}

const EDU040E01 = () => {

  const [, fetchRequest] = useSyncHttpCient<IResData>();
  const apiCall = new ApiCall(fetchRequest);
  const [crawlingData, setCrawlingData] = useState([]);
  const [crawlingData2, setCrawlingData2] = useState([]);

  const [show, setShow] = useState(false);

  React.useEffect(()=>{
    const searchValue = 'N'
    const arr1 = [];
    const arr2 = [];
    apiCall.retrieve(searchValue).then(response=>{
      console.log("apiCall==>"+JSON.stringify(response.data));


      for(let i = 0; i< 3; i++){
        arr1[i] = response.data[i] 
      }

      for(let i = 3; i< 10; i++){
        arr2[i] = response.data[i] 
      }

      setCrawlingData(arr1);
      setCrawlingData2(arr2);

      setShow(true);
    });
  },[])

   
  return (   
    <>
      <MainContent>
        {!show && <CircularProgress style={{width:'150px', height:'150px', marginTop: '17%', marginLeft: '46%', textAlign:'center'}}/>} 
        {!show && <DataLoading></DataLoading>}
        {show && <EduListHeader title="실시간 교육 TOP 10"></EduListHeader>}
        <TopContent>
          <EduList1to5 data={crawlingData}></EduList1to5>
        </TopContent>
        <BottomContent>
          <EduList5to10 data={crawlingData2}></EduList5to10>
        </BottomContent> 
      </MainContent>
    </>
  )
}    

export default EDU040E01;
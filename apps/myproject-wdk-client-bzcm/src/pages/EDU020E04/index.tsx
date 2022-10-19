import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import TopContentGraph from './layout/TopContentGraph';
import LeftContentGraph from './layout/LeftContentGraph';
import RightContentGraph from './layout/RightContentGraph';
import {
  Card,
} from "@material-ui/core";

    /* 
    화면 스타일 선언 */
    const MainContent = styled.section`
    width: 70%;
    margin-left: 250px;
    margin-right: 180px;
    padding-top: 15px;
    `;

    const TopContent = styled.section`
    float: center;
    height: 50%;
    margin-left: 300px;
    `;

    const LeftContent = styled.section`
    float: left;
    width: 47%;
    height: 50%;
    margin-left: 20px;
    margin-top: 25px;
  `;
    const RightContent = styled.section`
    float: right;
    width: 47%;
    height: 50%;
    margin-top: 25px;
  `;

const EDU020E02 = () => {

     const [, fetchRequest] = useSyncHttpCient<IResData>();
     const apiCall = new ApiCall(fetchRequest);
     const [byYearEduCost, setbyYearEduCost] = useState([]);
     const [byDeptEduCost, setbyDeptEduCost] = useState([]);
     const [byEmpEduCost, setbyEmpEduCost] = useState([]);
     
     
    

    React.useEffect(()=>{
      const searchValue = 'N'

      // 연도별 교육비
      apiCall.retrieve1(searchValue).then(response=>{
        setbyYearEduCost(response.data);
      });

      // 부서별 교육비
      apiCall.retrieve2(searchValue).then(response=>{
        setbyDeptEduCost(response.data);
      });

      // 사원별 교육비
      apiCall.retrieve3(searchValue).then(response=>{
        setbyEmpEduCost(response.data);
      });
    },[])

    return <>
      <Title useCleanup={false} useRetrive={false} useSave={false}></Title>
      <MainContent>
        <TopContent>
          <Card style={{width: '500px', height: '380px', paddingTop: '20px', paddingLeft: '15px'}}>
            <TopContentGraph data={byYearEduCost}></TopContentGraph>
          </Card>
        </TopContent>
        <LeftContent>
          <Card style={{width: '500px', height: '380px', paddingTop: '20px', paddingLeft: '15px'}}>
            <LeftContentGraph data={byDeptEduCost}></LeftContentGraph>
          </Card>
        </LeftContent>
        <RightContent>
          <Card style={{width: '500px', height: '380px', paddingTop: '20px', paddingLeft: '15px'}}>
            <RightContentGraph data={byEmpEduCost}></RightContentGraph>
          </Card>
        </RightContent>
      </MainContent>
    </>
};

export default EDU020E02;
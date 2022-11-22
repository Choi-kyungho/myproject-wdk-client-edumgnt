import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import ByYearEduCost from './layout/ByYearEduCost';
import ByDeptEduCost from './layout/ByDeptEduCost';
import SearchForm from './layout/SearchForm';
import MasterGrid from './layout/MasterGrid';
import MasterGrid2 from './layout/MasterGrid2';
import {
  Card,
} from "@material-ui/core";

const WrapMaster = styled.section`
    width: 100%;
    height: 100%;
    padding-left: 2%;
    padding-right: 2%;
`;


const TopTitle = styled.section`
  text-align: center;
  height: 10%;
  width: 100%;
  padding-top: 2%;
`;

const LeftTopContent = styled.section`
    float: left;
    height: 40%;
    width: 50%;
    padding-top: 2%;
`;

const RightTopContent = styled.section`
    float: right;
    height: 40%;
    width: 50%;
    padding-top: 2%;
`;

const BottomTitle = styled.section`
  text-align: center;
  height: 10%;
  width: 100%;
  padding-top: 2%;
`;

const LeftBottomContent = styled.section`
    float: left;
    height: 40%;
    width: 50%;
    margin-top: 7%;
`;

const RightBottomContent = styled.section`
    float: right;
    height: 40%;
    width: 50%;
    margin-top: 7%;
`;

const LeftBottomContent2 = styled.section`
    float: left;
    height: 40%;
    width: 50%;
    margin-top: 7%;
`;

const RightBottomContent2 = styled.section`
    float: right;
    height: 40%;
    width: 50%;
    margin-top: 7%;
`;


  
const EDU020E02 = () => {

     const [, fetchRequest] = useSyncHttpCient<IResData>();
     const apiCall = new ApiCall(fetchRequest);
     const [byYearEduCost, setbyYearEduCost] = useState([]);
     const [byYearEduCostGrid, setbyYearEduCostGrid] = useState([]);
     const [byDeptEduCost, setbyDeptEduCost] = useState([]);
     const [byEmpEduCost, setbyEmpEduCost] = useState([]);
     const searchFormRef = useRef<any>(null);

     const onMasterGridSelect = (value) => {
      searchFormRef.current.changeData(value);
    };

     const onRetrive = () => {

        const searchValue = searchFormRef.current.submit();
        // 전체 교육비 현황 (연도별) - BAR 차트
        apiCall.retrieve1(searchValue).then(response=>{
          setbyYearEduCost(response.data);
        });

        // 부서별 교육비 (부서별) - BAR 차트
        apiCall.retrieve2(searchValue).then(response=>{
          setbyDeptEduCost(response.data);
        });

        apiCall.retrieveGrid1(searchValue).then(response=>{
          setMastergridData(response.data);
        });

        apiCall.retrieveGrid2(searchValue).then(response=>{
          setMastergridData2(response.data);
          console.log(response.data);
        });

     }

     const masterGridRef = useRef(null);
     const [mastergridData, setMastergridData] = useState([]);

     const masterGridRef2 = useRef(null);
     const [mastergridData2, setMastergridData2] = useState([]);
  
    useEffect(() => {
      onRetrive();
    }, []);

    const onCleanup = () => {
      searchFormRef.current.cleanup();
    };

    const onChangeEduYear = () => {
      onRetrive();
    };

    return <>
      <Title onCleanup={onCleanup} useSave={false} onRetrive={onRetrive}></Title>
      <SearchForm ref={searchFormRef} onChangeEduYear={onChangeEduYear}></SearchForm>
      <WrapMaster>
        {/********** 전체교육비(연도별) 교육비 현황 ***********/}
        <TopTitle>
          <p style={{fontSize:'45px', fontWeight: '500', textDecoration: 'underline',textDecorationColor:'#2271B1', textUnderlinePosition: 'under'}}>전체 교육비 현황</p>
        </TopTitle>
        <LeftTopContent>
          <ByYearEduCost data={byYearEduCost}></ByYearEduCost>
        </LeftTopContent>
        <RightTopContent>
          <MasterGrid originRows={mastergridData} onSelectData={onMasterGridSelect} ref={masterGridRef}></MasterGrid>
        </RightTopContent>
        {/*****************************************************/}


        {/********** 부서별 교육비 현황 ***********************/}
        <LeftBottomContent>
          <ByDeptEduCost data={byDeptEduCost}></ByDeptEduCost>
        </LeftBottomContent>
        <RightBottomContent>
          <MasterGrid2 originRows={mastergridData2} onSelectData={onMasterGridSelect} ref={masterGridRef2}></MasterGrid2>
        </RightBottomContent>
        {/*****************************************************/}
      </WrapMaster>


    </>
};

export default EDU020E02;


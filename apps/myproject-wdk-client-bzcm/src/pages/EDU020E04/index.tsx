import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import ByYearEduCost from './layout/ByYearEduCost';
import ByDeptEduCost from './layout/ByDeptEduCost';
import SearchForm from './layout/SearchForm';
import MasterGrid from './layout/MasterGrid';
import {
  Card,
} from "@material-ui/core";

  const WrapContent = styled.section`
`;

const WrapContent2 = styled.section`
  width: 100%;
  height: 750px;
  margin-top: 1000px;
`;

const WrapContent3 = styled.section`
  width: 100%;
  height: 750px;
  margin-top: 1000px;
`;

  const LeftGraphContent = styled.section`
      float: left;
      width: 50%;
      height: 100%;
      padding-left: 30px;
      padding-top: 70px;
    `;

    const RightGraphContent = styled.section`
    float: left;
    width: 47%;
    height: 100%;
    padding-top: 70px;
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

        // 사원별 교육비
        apiCall.retrieveGrid1(searchValue).then(response=>{
          setMastergridData(response.data);
        });

        
     }

     const onRetrive_Grid1 = () => {
      const searchValue = searchFormRef.current.submit();

      // 사원별 교육비
      apiCall.retrieveGrid1(searchValue).then(response=>{
        setMastergridData(response.data);
        console.log(response.data);
      });
      
    }

    const onRetrive_Grid2 = () => {
      const searchValue = searchFormRef.current.submit();

      apiCall.retrieveGrid2(searchValue).then(response=>{
        setMastergridData(response.data);
        console.log(response.data);
      });

      
    }

     const masterGridRef = useRef(null);
     const [mastergridData, setMastergridData] = useState([]);
    
    // React.useEffect(()=>{
    //   const searchValue = 'N'

    //   // 연도별 교육비
    //   apiCall.retrieve1(searchValue).then(response=>{
    //     setbyYearEduCost(response.data);
    //   });

    //   // 부서별 교육비
    //   apiCall.retrieve2(searchValue).then(response=>{
    //     setbyDeptEduCost(response.data);
    //   });

    //   // 사원별 교육비
    //   apiCall.retrieve3(searchValue).then(response=>{
    //     setbyEmpEduCost(response.data);
    //   });
    // },[])
  
    useEffect(() => {
      onRetrive();
      setShow(true);
    }, []);

    

    const onCleanup = () => {
      searchFormRef.current.cleanup();
      setShow(true);
      setLeftState(true);
      setRightState(true);
    };

    const onChangeEduYear = () => {
      onRetrive();
    };

    const showCase1 = () => {
      setLeftState(true);
      setRightState(false);
      onRetrive_Grid1(); 
    }

    const showCase2 = () => {
      setLeftState(false);
      setRightState(true);
      onRetrive_Grid2(); 
    }
  
    const [show, setShow] = useState(false);
    const [leftState, setLeftState] = useState(true);
    const [rightState, setRightState] = useState(true);

    return <>
      <Title onCleanup={onCleanup} useSave={false} onRetrive={onRetrive}></Title>
      <SearchForm ref={searchFormRef} onChangeEduYear={onChangeEduYear}></SearchForm>

        <WrapContent style={leftState == true ? 
        {opacity: "1", transition: "opacity 1200ms"}: 
        {opacity: "0", visibility: "hidden", transition: "opacity 1200ms , visibility 1200ms",}}>
          <LeftGraphContent onClick={showCase1}>
              <ByYearEduCost data={byYearEduCost}></ByYearEduCost>
          </LeftGraphContent>
        </WrapContent>
      
        <RightGraphContent onClick={showCase2}>
          <WrapContent style={
            leftState == true && rightState == true ? {opacity: "1", transition: "opacity 2000ms"}
            : leftState == false &&  rightState == true ? {opacity: "1", transition: "opacity 2000ms", marginLeft: "-1920px"}
            : leftState == true && rightState == false ?  {opacity: "0", visibility: "hidden", transition: "opacity 2000ms , visibility 2000ms",}
            : {opacity: "0", visibility: "hidden", transition: "opacity 2000ms , visibility 2000ms",}}>
              <ByDeptEduCost data={byDeptEduCost}></ByDeptEduCost>
          </WrapContent>
          <WrapContent2 style={
            leftState == true && rightState == true ? {opacity: "0", visibility: "hidden", transition: "opacity 2000ms , visibility 2000ms"}
            : leftState == true && rightState == false ? {opacity: "1", transition: "opacity 2000ms", marginTop: '-70%'}
            : leftState == false && rightState == true ? {opacity: "1", transition: "opacity 2000ms", marginTop: '-70%'}
            : {opacity: "0", visibility: "hidden", transition: "opacity 2000ms , visibility 2000ms",}}>
            <MasterGrid originRows={mastergridData} onSelectData={onMasterGridSelect} ref={masterGridRef}></MasterGrid>
          </WrapContent2>
        </RightGraphContent>



    </>
};

export default EDU020E02;


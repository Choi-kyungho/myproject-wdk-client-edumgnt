// import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
// import React, { useRef, useState, useEffect } from 'react'
// import { ResponsivePie } from '@nivo/pie';
// import styled from 'styled-components';
// import ApiCall from './action/api';
// import ByYearEduCost from './layout/ByYearEduCost';
// import ByDeptEduCost from './layout/ByDeptEduCost';
// import SearchForm from './layout/SearchForm';
// import MasterGrid from './layout/MasterGrid';
// import {
//   Card,
// } from "@material-ui/core";

//   const WrapContent = styled.section`
// `;

//   const LeftGraphContent = styled.section`
//       float: left;
//       width: 50%;
//       height: 100%;
//       padding-left: 30px;
//       padding-top: 30px;
//     `;

//     const RightGraphContent = styled.section`
//     float: right;
//     width: 47%;
//     height: 50%;
//     padding-top: 30px;
//   `;
  
// const EDU020E02 = () => {

//      const [, fetchRequest] = useSyncHttpCient<IResData>();
//      const apiCall = new ApiCall(fetchRequest);
//      const [byYearEduCost, setbyYearEduCost] = useState([]);
//      const [byDeptEduCost, setbyDeptEduCost] = useState([]);
//      const [byEmpEduCost, setbyEmpEduCost] = useState([]);
//      const searchFormRef = useRef<any>(null);

//      const onMasterGridSelect = (value) => {
//       searchFormRef.current.changeData(value);
//     };

//      const onRetrive = () => {
//         const searchValue = searchFormRef.current.submit();
//         // 연도별 교육비
//         apiCall.retrieve1(searchValue).then(response=>{
//           setbyYearEduCost(response.data);
//         });

//         // 부서별 교육비
//         apiCall.retrieve2(searchValue).then(response=>{
//           setbyDeptEduCost(response.data);
//         });

//         // 사원별 교육비
//         apiCall.retrieve3(searchValue).then(response=>{
//           setbyEmpEduCost(response.data);
//         });
//      }

//      const masterGridRef = useRef(null);
//      const [mastergridData, setMastergridData] = useState([]);
    
//     // React.useEffect(()=>{
//     //   const searchValue = 'N'

//     //   // 연도별 교육비
//     //   apiCall.retrieve1(searchValue).then(response=>{
//     //     setbyYearEduCost(response.data);
//     //   });

//     //   // 부서별 교육비
//     //   apiCall.retrieve2(searchValue).then(response=>{
//     //     setbyDeptEduCost(response.data);
//     //   });

//     //   // 사원별 교육비
//     //   apiCall.retrieve3(searchValue).then(response=>{
//     //     setbyEmpEduCost(response.data);
//     //   });
//     // },[])
  
//     useEffect(() => {
//       onRetrive();
//       setShow(true);
//     }, []);

    

//     const onCleanup = () => {
//       searchFormRef.current.cleanup();
//       setShow(true);
//       setLeftState(true);
//       setRightState(true);
//     };

//     const onChangeEduYear = () => {
//       onRetrive();
//     };

//     const showCase1 = () => {
//       setLeftState(true);
//       setRightState(false);
//     }

//     const showCase2 = () => {
//       setLeftState(false);
//       setRightState(true);
//     }
  
//     const [show, setShow] = useState(false);
//     const [leftState, setLeftState] = useState(true);
//     const [rightState, setRightState] = useState(true);

//     return <>
//       <Title onCleanup={onCleanup} useSave={false} onRetrive={onRetrive}></Title>
//       <SearchForm ref={searchFormRef} onChangeEduYear={onChangeEduYear}></SearchForm>

//         <WrapContent style={leftState == true ? 
//         {opacity: "1", transition: "opacity 1200ms"}: 
//         {opacity: "0", visibility: "hidden", transition: "opacity 1200ms , visibility 1200ms",}}>
//           <LeftGraphContent onClick={showCase1}>
//             <Card style={{width: '750px', height: '730px', paddingTop: '20px', textAlign: 'center'}}>
//               <ByYearEduCost data={byYearEduCost}></ByYearEduCost>
//             </Card>
//           </LeftGraphContent>
//         </WrapContent>
      
//         <RightGraphContent onClick={showCase2}>
//           <WrapContent style={
//             leftState == true && rightState == true ? {opacity: "1", transition: "opacity 1000ms"}
//             : leftState == false &&  rightState == true ? {opacity: "1", transition: "opacity 1000ms", marginLeft: "-925px"}
//             : leftState == true && rightState == false ?  {opacity: "0", visibility: "hidden", transition: "opacity 1000ms , visibility 1000ms",}
//             : {opacity: "0", visibility: "hidden", transition: "opacity 1000ms , visibility 1000ms",}}>
//             <Card style={{width: '750px', height: '730px', paddingTop: '20px', textAlign: 'center'}}>
//               <ByDeptEduCost data={byDeptEduCost}></ByDeptEduCost>
//             </Card>
//           </WrapContent>
//           <WrapContent style={
//             leftState == true && rightState == true ? {opacity: "0", visibility: "hidden", transition: "opacity 3000ms , visibility 3000ms"}
//             : leftState == true && rightState == false ? {opacity: "1", transition: "opacity 3000ms", marginTop: '-750px'}
//             : leftState == false && rightState == true ? {opacity: "1", transition: "opacity 3000ms", marginTop: '-750px'}
//             : {opacity: "0", visibility: "hidden", transition: "opacity 3000ms , visibility 3000ms",}}>
//             <MasterGrid originRows={mastergridData} onSelectData={onMasterGridSelect} ref={masterGridRef}></MasterGrid>
//           </WrapContent>
//         </RightGraphContent>



//     </>
// };

// export default EDU020E02;


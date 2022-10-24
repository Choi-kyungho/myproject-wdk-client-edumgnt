// import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
// import React, { useRef, useState, useEffect } from 'react'
// import { ResponsivePie } from '@nivo/pie';
// import styled from 'styled-components';
// import ApiCall from './action/api';
// import LeftContentGraph1 from './layout/LeftContentGraph1';
// import RightContentGraph1 from './layout/RightContentGraph1';
// import LeftContentGraph2 from './layout/LeftContentGraph2';
// import RightContentGraph2 from './layout/RightContentGraph2';
// import SearchForm from './layout/SearchForm';
// import {
//     Card,
//   } from "@material-ui/core";
//     /* 
//     화면 스타일 선언 */
//     const MainContent = styled.section`
//     width: 70%;
//     margin-left: 250px;
//     margin-right: 180px;
//     padding-top: 15px;
//     `;

//     const LeftContent1 = styled.section`
//     float: left;
//     width: 47%;
//     height: 50%;
//     margin-left: 20px;
//   `;
//     const RightContent1 = styled.section`
//     float: right;
//     width: 47%;
//     height: 50%;
//   `;
//   const LeftContent2 = styled.section`
//     float: left;
//     width: 47%;
//     height: 50%;
//     margin-left: 20px;
//     margin-top: 20px;
//   `;
//     const RightContent2 = styled.section`
//     float: right;
//     width: 47%;
//     height: 50%;
//     margin-top: 20px;
//   `;

// const EDU020E02 = () => {
//     const [, fetchRequest] = useSyncHttpCient<IResData>();
//     const apiCall = new ApiCall(fetchRequest);
//     const [byYearEduTime, setbyYearEduTime] = useState([]);
//     const [byDeptEduTime, setbyDeptEduTime] = useState([]);
//     const [byEmpEduRankTime, setbyEmpEduRankTime] = useState([]);
//     const [byDeptEduRankTime, setbyDeptEduRankTime] = useState([]);
//     const SearchFormRef = useRef(null);

    
//     React.useEffect(()=>{
//       const searchValue = SearchFormRef.current.submit();
//       // 연도별 교육현황
//       apiCall.retrieve(searchValue).then(response=>{
//         setbyYearEduTime(response.data);
//       });

//       apiCall.retrieve2(searchValue).then(response=>{
//         setbyDeptEduTime(response.data);
//       });

//       // 개인별,부서별 교육현황
//       apiCall.retrieve3(searchValue).then(response=>{
//         setbyEmpEduRankTime(response.data);
//       });

//       apiCall.retrieve4(searchValue).then(response=>{
//         setbyDeptEduRankTime(response.data);
//       });
//     },[])

//     const onCleanup = () => {
//       SearchFormRef.current.cleanup();
//     };

//     return <>
//       <Title onCleanup={onCleanup} useSave={false} ></Title>
//         <SearchForm ref={SearchFormRef}></SearchForm>
//       <MainContent>
//       <LeftContent1>
//         <Card style={{width: '480px', height: '380px', paddingTop: '10px', paddingLeft: '15px'}}>
//           <LeftContentGraph1 data={byYearEduTime}></LeftContentGraph1>
//         </Card>
//       </LeftContent1>
//       <RightContent1>
//         <Card style={{width: '480px', height: '380px', paddingTop: '10px', paddingLeft: '15px'}}>
//           <RightContentGraph1 data={byDeptEduTime}></RightContentGraph1>
//         </Card>
//       </RightContent1>
//       <LeftContent2>
//         <Card style={{width: '480px', height: '380px', paddingTop: '10px', paddingLeft: '15px'}}>
//           <LeftContentGraph2 data={byEmpEduRankTime}></LeftContentGraph2>
//         </Card>
//       </LeftContent2>  
//       <RightContent2>
//         <Card style={{width: '480px', height: '380px', paddingTop: '10px', paddingLeft: '15px'}}>
//           <RightContentGraph2 data={byDeptEduRankTime}></RightContentGraph2>
//         </Card>
//       </RightContent2>
//       </MainContent>
//     </>
// };

// export default EDU020E02;
// import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
// import React, { useRef, useState, useEffect } from 'react'
// import ApiCall from './action/api';
// import EduList1to5 from './layout/EduList1to5';
// import EduList5to10 from './layout/EduList5to10';
// import EduListHeader from './layout/EduListHeader';
// import DataLoading from './layout/dataLoading';
// import styled from 'styled-components';
// import {
//   CircularProgress,
//   Box
// } from "@material-ui/core";

// const MainContent = styled.section`
// width: 70%;
// float: center;
// margin-left: 250px;
// margin-right: 180px;
// padding-top: 30px;
// `;


// const LeftContent = styled.section`
// width: 48%;
// float: left;
// padding-top: 10px;
// `;
// const RightContent = styled.section`
// width: 48%;
// float: right;
// padding-top: 10px;
// `;

// type Props = {}

// const EDU040E01 = () => {

//   const [, fetchRequest] = useSyncHttpCient<IResData>();
//   const apiCall = new ApiCall(fetchRequest);
//   const [crawlingData, setCrawlingData] = useState([]);
//   const [crawlingData2, setCrawlingData2] = useState([]);

//   const [show, setShow] = useState(false);

//   React.useEffect(()=>{
//     const searchValue = 'N'
//     const arr1 = [];
//     const arr2 = [];
//     apiCall.retrieve(searchValue).then(response=>{
//       console.log("apiCall==>"+JSON.stringify(response.data));


//       for(let i = 0; i< 3; i++){
//         arr1[i] = response.data[i] 
//       }

//       for(let i = 3; i< 10; i++){
//         arr2[i] = response.data[i] 
//       }

//       setCrawlingData(arr1);
//       setCrawlingData2(arr2);

//       setShow(true);
//     });
//   },[])

   
//   return (
//     <>
//       <MainContent>
//           {!show && <CircularProgress style={{width:'150px', height:'150px', marginTop: '25%', textAlign:'center', marginLeft:'45%'}}/>} 
//           {!show && <DataLoading></DataLoading>}
//         {show && <EduListHeader title="실시간 교육 TOP 10"></EduListHeader>}
//         <LeftContent>
//           <EduList1to5 data={crawlingData}></EduList1to5>
//         </LeftContent>
//         <RightContent>
//           <EduList5to10 data={crawlingData2}></EduList5to10>
//         </RightContent>
//       </MainContent>
//     </>
//   )
// }    

// export default EDU040E01;
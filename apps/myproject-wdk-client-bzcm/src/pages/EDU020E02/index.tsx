import { IResData, Title, useSyncHttpCient, Notify } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import LeftContentGraph1 from './layout/LeftContentGraph1';
import RightContentGraph1 from './layout/RightContentGraph1';
import LeftContentGraph2 from './layout/LeftContentGraph2';
import RightContentGraph2 from './layout/RightContentGraph2';
import SearchForm from './layout/SearchForm';
import PopModal from "./layout/211_PopModal";
    /* 
    화면 스타일 선언 */
    const MainContent = styled.section`
    width: 100%;
    height: 100%;
    padding-left: 2%;
    padding-right: 2%;
    `;

    const LeftContent1 = styled.section`
    float: left;
    width: 47%;
    height: 50%;
  `;
    const RightContent1 = styled.section`
    float: right;
    width: 47%;
    height: 50%;
  `;
  const LeftContent2 = styled.section`
    float: left;
    width: 47%;
    height: 50%;
    margin-top: 10%;
  `;
    const RightContent2 = styled.section`
    float: right;
    width: 47%;
    height: 50%;
    margin-top: 10%;
  `;

const EDU020E02 = () => {
    const [, fetchRequest] = useSyncHttpCient<IResData>();
    const apiCall = new ApiCall(fetchRequest);
    const [byYearEduTime, setbyYearEduTime] = useState([]);
    const [byDeptEduTime, setbyDeptEduTime] = useState([]);
    const [byEmpEduRankTime, setbyEmpEduRankTime] = useState([]);
    const [byDeptEduRankTime, setbyDeptEduRankTime] = useState([]);
    const searchFormRef = useRef<any>(null);
    const [searchParam, setSearchParam] = useState({});

    const onRetrive = () => {
      // 현재 조회파라미터들을 searchValue 변수에 담아서 조회함수에 파라미터로 전달
      const searchValue = searchFormRef.current.submit();

      // 연도별 교육현황
      apiCall.retrieve(searchValue).then(response=>{
        setbyYearEduTime(response.data);
      });

      apiCall.retrieve2(searchValue).then(response=>{
        setbyDeptEduTime(response.data);
      });

      // 개인별,부서별 교육현황
      apiCall.retrieve3(searchValue).then(response=>{
        setbyEmpEduRankTime(response.data);
      });

      apiCall.retrieve4(searchValue).then(response=>{
        setbyDeptEduRankTime(response.data);
      });
    };

    useEffect(() => {
      onRetrive();
    }, []);
    // React.useEffect(()=>{
    //   const searchValue = SearchFormRef.current.submit();
    //   // 연도별 교육현황
    //   apiCall.retrieve(searchValue).then(response=>{
    //     setbyYearEduTime(response.data);
    //   });

    //   apiCall.retrieve2(searchValue).then(response=>{
    //     setbyDeptEduTime(response.data);
    //   });

    //   // 개인별,부서별 교육현황
    //   apiCall.retrieve3(searchValue).then(response=>{
    //     setbyEmpEduRankTime(response.data);
    //   });

    //   apiCall.retrieve4(searchValue).then(response=>{
    //     setbyDeptEduRankTime(response.data);
    //   });
    // },[])

       

    const onCleanup = () => {
      searchFormRef.current.cleanup();
    };

    const onChangeEduYear = () => {
      onRetrive();
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [detailRows, setDetailRows] = useState([]);

    const onAddData = () => {
      if (!isOpenModal) {
        setIsOpenModal(true);
      }
    };
  
    const closeAddData = () => {
      if (isOpenModal) {
        setIsOpenModal(false);
      }
    };

    const onModalDisplay_fromYear = ((el) => {
      console.log("자식에서 호출 onModalDisplay_fromYear"+ JSON.stringify(el.data.연도));
      setSearchParam(el.data);
      onAddData(); 
    });

    const onModalDisplay_fromDept = ((el) => {
      console.log("자식에서 호출 onModalDisplay_fromDept"+ JSON.stringify(el.data));
      setSearchParam(el.data);
      onAddData(); 
    });

    const onModalDisplay_fromEmp = ((el) => {
      console.log("자식에서 호출 onModalDisplay_fromEmp"+ JSON.stringify(el.data));
      setSearchParam(el.data);
      onAddData(); 
    });

    return <>
      <Title onCleanup={onCleanup} useSave={false} onRetrive={onRetrive}></Title>
      <SearchForm ref={searchFormRef} onChangeEduYear={onChangeEduYear} ></SearchForm>
      <MainContent>
      <LeftContent1>
          <LeftContentGraph1 data={byYearEduTime} onModalDisplay={onModalDisplay_fromYear}></LeftContentGraph1>
      </LeftContent1>
      <RightContent1>
          <RightContentGraph1 data={byDeptEduTime} onModalDisplay={onModalDisplay_fromDept}></RightContentGraph1>
      </RightContent1>
      <LeftContent2>
          <LeftContentGraph2 data={byEmpEduRankTime} onModalDisplay={onModalDisplay_fromEmp}></LeftContentGraph2>
      </LeftContent2>
      <RightContent2>
          <RightContentGraph2 data={byDeptEduRankTime} onModalDisplay={onModalDisplay_fromDept}></RightContentGraph2>
      </RightContent2>
      </MainContent>
      {isOpenModal && (
        <PopModal
          onModalClose={closeAddData}
          detailRows={detailRows}
          searchParam={searchParam}
        ></PopModal>
      )}
    </>
};

export default EDU020E02;
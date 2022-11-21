import { IResData, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import ApiCall from './action/api';
import TotalCount from './layout/TotalCount';
import ByJobCount from './layout/ByJobCount';
import ByRespCount from './layout/ByRespCount';

import PopModal from "./layout/211_PopModal";
    /* 
    화면 스타일 선언 */
    const TopContent = styled.section`
    float: center;
    width: 100%;
    height: 50%;
  `;
    const LeftContent = styled.section`
    float: left;
    width: 50%;
    height: 50%;
    padding-left: 30px;
  `;
  const RightContent = styled.section`
    float: right;
    width: 50%;
    height: 50%;
  `;

const EDU020E01 = () => {
    // const dataTmp = [
    //   { id: 'ERP운영팀', value: 324, row_stat: 'unchanged'},
    //   { id: '정보보호팀', value: 88, row_stat: 'unchanged'},
    //   { id: '사업1팀', value: 221, row_stat: 'unchanged'},
    //   { id: '사업2팀', value: 123, row_stat: 'unchanged'},
    // ]; 
  
    const [, fetchRequest] = useSyncHttpCient<IResData>();
    const apiCall = new ApiCall(fetchRequest);

    const [totalCnt, setTotalCnt] = useState([]);
    const [byJobCnt, setbyJobCnt] = useState([]);
    const [byRespCnt, setbyRespCnt] = useState([]);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [detailRows, setDetailRows] = useState([]);
    const [searchParam, setSearchParam] = useState({});

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

    React.useEffect(()=>{
      const searchValue = 'Y'

      // 전체인원현황
      apiCall.retrieve(searchValue).then(response=>{
          setTotalCnt(response.data);
      });

      // 직무별
      apiCall.retrieve2(searchValue).then(response=>{
        setbyJobCnt(response.data);
      });

      // 직급별
      apiCall.retrieve3(searchValue).then(response=>{
        setbyRespCnt(response.data);
      });
    },[])

    const [CreateModal, setCreateModal] = useState(false); // 모달 생성 유무
​
    // 모달 On
    const onModalDisplay_fromDept = ((el) => {
      console.log("onModalDisplay param ===>"+JSON.stringify(el.data.dept_code));
      setSearchParam(el.data);
      onAddData(); 
    });

    const onModalDisplay_fromJob = ((el) => {
      console.log("onModalDisplay_fromJob param ===>"+JSON.stringify(el.data.job));
      setSearchParam(el.data);
      onAddData(); 
    });

    const onModalDisplay_fromResp = ((el) => {
      console.log("onModalDisplay_fromResp param ===>"+JSON.stringify(el.data.responsi));
      setSearchParam(el.data);
      onAddData(); 
    });

    return <>
      <Title useCleanup={false} useRetrive={false} useSave={false}></Title>
      <TopContent>
        <TotalCount data={totalCnt} onModalDisplay={onModalDisplay_fromDept}></TotalCount>
      </TopContent>
      <LeftContent onClick={onAddData}>
        <ByJobCount data={byJobCnt} onModalDisplay={onModalDisplay_fromJob}></ByJobCount>
      </LeftContent>
      <RightContent onClick={onAddData}>
        <ByRespCount data={byRespCnt} onModalDisplay={onModalDisplay_fromResp}></ByRespCount>
      </RightContent>
      {isOpenModal && (
        <PopModal
          onModalClose={closeAddData}
          detailRows={detailRows}
          searchParam={searchParam}
        ></PopModal>
      )}
    </>
};

export default EDU020E01;
import { CodeService, IResData, Notify, Title, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import { find, findIndex, findKey, findLastIndex, indexOf, sortedIndex } from 'lodash';
import React, { useRef, useState } from 'react';
import { cursorTo } from 'readline';
import { DefaultValue, selector } from 'recoil';
import styled from 'styled-components';
import ApiCall from './action/api';
import MasterGrid from './layout/200_MasterGrid';
import SearchForm from './layout/100_SearchForm';

/* 
    화면 스타일 선언 */

// 화면을 좌우로 나눈다
// 원하는대로 커스텀 가능 EX) 좌측 마스터그리드, 우측 디테일그리드 2개

// 좌측 높이(height)가 100%, 넓이가 50%인 영역을 좌측 정렬
const LeftContent = styled.section`
  float: center;
  width: 100%;
  height: 100%;
`;

type Props = {};

/*
각 기능에 대한 간략한 프로세스

1. 조회

 1-1.onRetrive 함수 실행
 1-2.api.ts에서 정의된 조회api함수 실행
 1-3.백엔드에서 api가 호출되고 데이터를 받아옴
 1-4.받아온 데이터를 hook에 상태 저장
 1-5. hook을 마스터그리드에 props로 전달
 1-6. MasterGrid.tsx 61행 useEffect 실행 
 
2. 상세조회

 2-1. 마스터그리드를 클릭
 2-2. 마스터그리드 클릭이벤트 발생(onMasterGridSelect)
 2-3. 디테일그리드 세팅

3. 저장
  
 3-1. 저장 버튼 클릭 
 3-2. onSave 함수 실행
 3-3. api.ts에서 정의된 저장api함수 실행
 3-4. api 에서 저장까지 모두 마친 후 return 
 3-4. 재조회 (onRetrive)

*/

const EDU000E03 = (props: Props) => {
  const [, fetchRequest] = useSyncHttpCient<IResData>();

  // API 함수 정의
  const apiCall = new ApiCall(fetchRequest);

  // ~~FormRef => 각 컴포넌트로 전달할 파라미터를 담을 변수
  const SearchFormRef = useRef(null);
  const masterGridRef = useRef(null);

  /**state 선언 */
  // ex) const [mastergridData, setMastergridData] = useState([]); 에서
  //            mastergridData는 api로부터 받아온 데이터를 각 컴포넌트로 전달할 데이터
  //         setMastergridData는 api로부터 받아온 데이터를 세팅
  //         이 변수를 HOOK 이라고 함

  const [mastergridData, setMastergridData] = useState([]);

  // 저장 함수
  const onSave = () => {
    const saveData = masterGridRef.current.save();

    // saveData는 api.ts에 있는 saveData 저장api함수
    // 저장 api함수 호출 후 조회함수 재호출
    apiCall.saveData(saveData).then(() => {
      Notify.update();
      onRetrive();
    });
  };

  // 조회 함수
  const onRetrive = () => {
    // 현재 조회파라미터들을 searchValue 변수에 담아서 조회함수에 파라미터로 전달
    const searchValue = SearchFormRef.current.submit();

    apiCall.retrieve(searchValue).then((response) => {
      // 조회api 함수에서 받아온 데이터를 MasterGrid로 전달하기 위해 setMastergridData 훅에 담음
      setMastergridData(response.data);

      // 알림 메시지
      if (response.success) {
        Notify.retrive();
      } else {
        Notify.notfound();
      }
    });
  };

  // 조회, 저장 이후 각 Ref를 초기화
  const onCleanup = () => {
    masterGridRef.current.cleanup();
    SearchFormRef.current.cleanup();
  };

  // 마스터그리드를 선택했을 때 이벤트
  // 마스터그리드의 row를 선택하면 디테일그리드에 값이 세팅된다
  // onMasterGridSelect는 재정의할 필요없이 각 화면에 그대로 사용하면 된다
  const onMasterGridSelect = (value) => {
    // detailFormRef.current.changeData(value);
  };

  return (
    <>
      {/* 저장화면에선 Title에 onSave(저장) onRetrive(조회) onCleanup(초기화) 필수*/}
      <Title onSave={onSave} onRetrive={onRetrive} onCleanup={onCleanup}></Title>

      {/*SearchForm에서 사용할 파라미터를 전달 (SearchFormRef)*/}
      <SearchForm ref={SearchFormRef}></SearchForm>

      <MasterGrid originRows={mastergridData} onSelectData={onMasterGridSelect} ref={masterGridRef}></MasterGrid>
    </>
  );
};

export default EDU000E03;

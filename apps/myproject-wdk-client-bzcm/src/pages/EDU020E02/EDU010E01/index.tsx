import { CodeService, IResData, Title, useSyncHttpCient, Notify } from '@vntgcorp/vntg-wdk-client';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ApiCall from './action/api';
import DetailForm from './layout/DetailForm';
import MasterGrid from './layout/MasterGrid';
import SearchForm from './layout/SearchForm';
import { error, success, warning } from '@vntgcorp/vntg-wdk-client';
import { ValidationError, ValidationLevel } from 'realgrid';

/* 
    화면 스타일 선언 */

// 화면을 좌우로 나눈다
// 원하는대로 커스텀 가능 EX) 좌측 마스터그리드, 우측 디테일그리드 2개

// 좌측 높이(height)가 100%, 넓이가 50%인 영역을 좌측 정렬
const LeftContent = styled.section`
  float: left;
  width: 50%;
  height: 100%;
`;

// 우측: 높이(height)가 100%, 넓이가 50%인 영역을 우측 정렬
const RightContent = styled.section`
  float: right;
  width: 50%;
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

const EDU010E01 = (props: Props) => {
  const [, fetchRequest] = useSyncHttpCient<IResData>();

  // API 함수 정의
  const apiCall = new ApiCall(fetchRequest);

  // ~~FormRef => 각 컴포넌트로 전달할 파라미터를 담을 변수
  const SearchFormRef = useRef(null);
  const detailFormRef = useRef(null);
  const masterGridRef = useRef(null);

  /**state 선언 */
  // ex) const [mastergridData, setMastergridData] = useState([]); 에서
  //            mastergridData는 api로부터 받아온 데이터를 각 컴포넌트로 전달할 데이터
  //         setMastergridData는 api로부터 받아온 데이터를 세팅
  //         이 변수를 HOOK 이라고 함

  const [mastergridData, setMastergridData] = useState([]);

  // const error: ValidationError = {
  //   message: '',
  //   level: ValidationLevel.IGNORE,
  // };

  // 저장 함수
  const onSave = () => {
    const saveData = masterGridRef.current.save();

    // 유효성 체크
    try {
      // edu_name 필수 체크
      const eduName = saveData[0].edu_name;
      if (!eduName) {
        warning('[교육명] 필수 입력 사항입니다.');
        return [];
      }

      // edu_time
      const eduTime = saveData[0].edu_time;
      if (!eduTime) {
        warning('[교육시간] 필수 입력 사항입니다.');
        return [];
      }

      // emp_no 필수 체크
      const empNo = saveData[0].emp_no;
      if (!empNo) {
        warning('[사원번호] 필수 입력 사항입니다.');
        return [];
      }

      // edu_type 필수 체크
      const eduType = saveData[0].edu_type;
      if (!eduType) {
        warning('[교육형태] 필수 입력 사항입니다.');
        return [];
      }

      // edu_large_class 필수 체크
      const eduLargeClass = saveData[0].edu_large_class;
      if (!eduLargeClass) {
        warning('[교육대분류] 필수 입력 사항입니다.');
        return [];
      }

      // edu_middle_class 필수 체크
      const eduMiddleClass = saveData[0].edu_middle_class;
      if (!eduMiddleClass) {
        warning('[교육중분류] 필수 입력 사항입니다.');
        return [];
      }

      // edu_supervision 필수 체크
      const eduSupervision = saveData[0].edu_supervision;
      if (!eduSupervision) {
        warning('[교육주관] 필수 입력 사항입니다.');
        return [];
      }

      // edu_location 필수 체크
      const eduLocation = saveData[0].edu_location;
      if (!eduLocation) {
        warning('[교육장소] 필수 입력 사항입니다.');
        return [];
      }

      // edu_cost 필수 체크
      const eduCost = saveData[0].edu_cost;
      if (!eduCost) {
        warning('[교육비] 필수 입력 사항입니다.');
        return [];
      }

      // 마감여부 체크
      const closeYn = saveData[0].close_yn;
      if (closeYn == 'Y') {
        warning('교육일정이 마감되었습니다. 수정/삭제 불가능합니다.');
        return [];
      }
    } catch (err) {
      error(err);
    }

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

  // 교육일정번호 Max값 가져오기
  const onGetMaxEduSchedule = (searchValue) => {
    // 현재 조회파라미터들을 searchValue 변수에 담아서 조회함수에 파라미터로 전달

    apiCall.getMaxEduSchedule(searchValue).then((response) => {
      // 조회api 함수에서 받아온 데이터를 MasterGrid로 전달하기 위해 setMastergridData 훅에 담음
      // setMastergridData(response.data);
      // console.log('index.tsx getMaxEduSchedule ===========>   ' + response.data[0].edu_schedule_no);
      masterGridRef.current.changeData('edu_schedule_no', response.data[0].edu_schedule_no);
      detailFormRef.current.setMaxEduScheduleNo({
        edu_schedule_no: response.data[0].edu_schedule_no,
      });

      // return response.data;
      // 알림 메시지
      // if (response.success) {
      //   Notify.retrive();
      // } else {
      //   Notify.notfound();
      // }
    });
  };

  // 사원정보 가져오기
  const onGetEmpInfo = (searchValue) => {
    // 현재 조회파라미터들을 searchValue 변수에 담아서 조회함수에 파라미터로 전달

    apiCall.getEmpInfo(searchValue).then((response) => {
      // 조회api 함수에서 받아온 데이터를 MasterGrid로 전달하기 위해 setMastergridData 훅에 담음
      // setMastergridData(response.data);

      // console.log('index.tsx getEmpInfo ===========>   ' + response.data[0].emp_name);

      masterGridRef.current.changeData('emp_name', response.data[0].emp_name);
      masterGridRef.current.changeData('dept_code', response.data[0].dept_code);
      masterGridRef.current.changeData('dept_name', response.data[0].dept_name);

      detailFormRef.current.setEmpInfo({
        emp_name: response.data[0].emp_name,
        dept_code: response.data[0].dept_code,
      });

      // return response.data;
      // 알림 메시지
      // if (response.success) {
      //   Notify.retrive();
      // } else {
      //   Notify.notfound();
      // }
    });
  };

  // 조회, 저장 이후 각 Ref를 초기화
  const onCleanup = () => {
    masterGridRef.current.cleanup();
    SearchFormRef.current.cleanup();
    detailFormRef.current.cleanup();
  };

  // 마스터그리드를 선택했을 때 이벤트
  // 마스터그리드의 row를 선택하면 디테일그리드에 값이 세팅된다
  // onMasterGridSelect는 재정의할 필요없이 각 화면에 그대로 사용하면 된다
  const onMasterGridSelect = (value) => {
    detailFormRef.current.changeData(value);
  };

  // 디테일그리드에 데이터변화가 일어났을 때 이벤트
  // 디테일그리드에 데이터변화가 일어났을 때 마스터그리드에 값이 세팅된다.
  // onDetailDataChange 재정의할 필요없이 각 화면에 그대로 사용하면 된다
  const onDetailDataChange = (name, value) => {
    switch (name) {
      case 'edu_type':
      case 'edu_large_class':
      case 'edu_middle_class':
      case 'edu_supervision':
      case 'dept_code':
        // 교육형태(edu_type, EDU01), 교육대분류(edu_large_class, EDU02), 교육중분류(edu_middle_class, EDU03), 교육주관(edu_supervision, EDU06), 부서 (dept_code, CM10) 변경 시 detail_code_name도 함께 세팅
        let commCode, fieldName;

        if (name == 'edu_type') {
          commCode = 'EDU01';
          fieldName = 'edu_type_name';
        } else if (name == 'edu_large_class') {
          commCode = 'EDU02';
          fieldName = 'edu_large_class_name';
        } else if (name == 'edu_middle_class') {
          commCode = 'EDU03';
          fieldName = 'edu_middle_class_name';
        } else if (name == 'edu_supervision') {
          commCode = 'EDU06';
          fieldName = 'edu_supervision_name';
        } else {
          commCode = 'CM10';
          fieldName = 'dept_name';
        }

        let selIdx = CodeService.getCode(commCode)
          .codedetail.map((row) => row.detail_code_id)
          .indexOf(value);
        let detailCodeName = CodeService.getCode(commCode).codedetail.map((row) => row.detail_code_name)[selIdx];

        masterGridRef.current.changeData(name, value);
        masterGridRef.current.changeData(fieldName, detailCodeName);
        break;

      default:
        // 기타
        masterGridRef.current.changeData(name, value);
        break;
    }
  };

  return (
    <>
      {/* 저장화면에선 Title에 onSave(저장) onRetrive(조회) onCleanup(초기화) 필수*/}
      <Title onSave={onSave} onRetrive={onRetrive} onCleanup={onCleanup}></Title>

      {/*SearchForm에서 사용할 파라미터를 전달 (SearchFormRef)*/}
      <SearchForm ref={SearchFormRef}></SearchForm>
      <LeftContent>
        {/* originRow ==> api에서 받아온 데이터를 파라미터로 넘겨줌 
                    onSelectData ==> 마스터그리드를 클릭했을 때 이벤트를 지정 (각 화면마다 동일)
                    ref ==> 마스터그리드에서 사용할 파라미터 
                */}
        <MasterGrid
          originRows={mastergridData}
          onSelectData={onMasterGridSelect}
          onGetMaxEduSchedule={onGetMaxEduSchedule}
          onGetEmpInfo={onGetEmpInfo}
          ref={masterGridRef}
        ></MasterGrid>
      </LeftContent>
      <RightContent>
        <DetailForm ref={detailFormRef} onChangeData={onDetailDataChange}></DetailForm>
      </RightContent>
    </>
  );
};

export default EDU010E01;

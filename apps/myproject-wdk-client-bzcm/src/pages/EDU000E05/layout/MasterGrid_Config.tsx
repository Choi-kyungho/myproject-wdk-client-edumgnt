import { ValueType } from 'realgrid';
import { GRIDSTYLETYPE } from '@vntgcorp/vntg-wdk-client';
// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'cm_code_type_id',
    dataType: ValueType.TEXT,
    headerText: '공통 코드 유형 ID',
    width: 100,
    editable: false,
    visible: false,
  },
  {
    fieldName: 'edu_code_id',
    dataType: ValueType.TEXT,
    headerText: '교육 기관 ID',
    width: 100,
    editable: false,
    visible: true,
  },
  {
    fieldName: 'edu_code_name',
    dataType: ValueType.TEXT,
    headerText: '교육 기관 명',
    width: 250,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'use_yn',
    dataType: ValueType.TEXT,
    headerText: '사용 여부',
    width: 70,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'sort_seq',
    dataType: ValueType.TEXT,
    headerText: '정렬 순서',
    width: 70,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'url',
    dataType: ValueType.TEXT,
    headerText: '홈페이지',
    width: 150,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'business_no',
    dataType: ValueType.TEXT,
    headerText: '사업자 등록번호',
    width: 150,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'addr',
    dataType: ValueType.TEXT,
    headerText: '주소',
    width: 300,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'president',
    dataType: ValueType.TEXT,
    headerText: '대표자',
    width: 100,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'tel_no',
    dataType: ValueType.TEXT,
    headerText: '대표 전화',
    width: 100,
    editable: true,
    visible: true,
  },
  {
    fieldName: 'remarks',
    dataType: ValueType.TEXT,
    headerText: '비고',
    width: 500,
    editable: true,
    visible: true,
  },
];

import { GRIDSTYLETYPE } from '@vntgcorp/vntg-wdk-client';
import { ValueType } from 'realgrid';

// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'edu_plan_no',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육계획등록번호',
    width: 130,
  },
  {
    fieldName: 'edu_schedule_no',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육일정번호',
    width: 130,
  },
  {
    fieldName: 'dept_code',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '부서',
    width: 130,
  },
  {
    fieldName: 'dept_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '부서',
    width: 100,
  },

  {
    fieldName: 'emp_no',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '사원코드',
    width: 70,
  },
  {
    fieldName: 'emp_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '사원명',
    width: 60,
  },
  {
    fieldName: 'edu_year',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육년도',
    width: 50,
  },
  {
    fieldName: 'edu_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육명',
    width: 300,
    footer: {
      text: '합계 =>',
    },
  },
  {
    fieldName: 'edu_from_dt',
    dataType: ValueType.DATE,
    visible: true,
    headerText: '교육시작일자',
    datetimeFormat: 'yyyy-MM-dd',
    width: 90,
  },
  {
    fieldName: 'edu_to_dt',
    dataType: ValueType.DATE,
    visible: true,
    headerText: '교육종료일자',
    datetimeFormat: 'yyyy-MM-dd',
    width: 90,
  },
  {
    fieldName: 'edu_time',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '교육시간',
    width: 70,
    numberFormat: '#,##0',
    textAlignment: GRIDSTYLETYPE.TEXTRIGHT,
    footerFormat: '#,##0',
    footer: {
      expression: 'sum',
      numberFormat: '#,##0',
    },
  },
  {
    fieldName: 'edu_type',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육형태코드',
    width: 70,
  },
  {
    fieldName: 'edu_type_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육형태',
    width: 70,
  },
  {
    fieldName: 'edu_large_class',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육대분류코드',
    width: 80,
  },
  {
    fieldName: 'edu_large_class_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육대분류',
    width: 80,
  },
  {
    fieldName: 'edu_middle_class',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육중분류코드',
    width: 80,
  },
  {
    fieldName: 'edu_middle_class_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육중분류',
    width: 80,
  },
  {
    fieldName: 'edu_supervision',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육주관코드',
    width: 80,
  },
  {
    fieldName: 'edu_supervision_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육주관',
    width: 80,
  },
  {
    fieldName: 'edu_location',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육장소',
    width: 80,
  },
  {
    fieldName: 'edu_cost',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '교육비',
    width: 80,
    numberFormat: '#,##0',
    textAlignment: GRIDSTYLETYPE.TEXTRIGHT,
    footerFormat: '#,##0',
    footer: {
      expression: 'sum',
      numberFormat: '#,##0',
    },
  },
  {
    fieldName: 'edu_rate',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '교육이행률',
    width: 80,
    numberFormat: '#,##0',
    textAlignment: GRIDSTYLETYPE.TEXTRIGHT,
  },
  {
    fieldName: 'edu_cmplt_yn',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '수료여부',
    width: 80,
  },
  {
    fieldName: 'edu_absence_yn',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '불참여부',
    width: 80,
  },
  {
    fieldName: 'edu_absence_reason',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '불참사유',
    width: 80,
  },
  {
    fieldName: 'rmk',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '비고',
    width: 150,
  },
  {
    fieldName: 'edu_attach_id',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '첨부ID',
    width: 150,
  },
  {
    fieldName: 'close_yn',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '마감여부',
    width: 150,
  },
  {
    fieldName: 'first_rg_yms',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'first_rg_idf',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'last_update_yms',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'last_update_idf',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'row_stat',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'edu_file_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '첨부파일명',
    width: 250,
  },
];

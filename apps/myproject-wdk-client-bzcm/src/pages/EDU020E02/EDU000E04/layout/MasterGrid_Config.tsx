import { ValueType } from 'realgrid';

// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'edu_schedule_no',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육일정번호',
    width: 130,
  },
  {
    fieldName: 'edu_year',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육년도',
    width: 80,
  },
  {
    fieldName: 'edu_from_dt',
    dataType: ValueType.DATE,
    visible: true,
    headerText: '시작기간',
    datetimeFormat: 'yyyy-MM-dd',
    width: 100,
  },
  {
    fieldName: 'edu_to_dt',
    dataType: ValueType.DATE,
    visible: true,
    headerText: '종료기간',
    datetimeFormat: 'yyyy-MM-dd',
    width: 100,
  },
  {
    fieldName: 'close_yn',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '마감여부',
    width: 80,
  },
  {
    fieldName: 'rmk',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '비고',
    width: 300,
  },
  {
    fieldName: 'edu_plan_cnt',
    dataType: ValueType.INT,
    visible: false,
    headerText: '교육계획건수',
    width: 300,
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
];

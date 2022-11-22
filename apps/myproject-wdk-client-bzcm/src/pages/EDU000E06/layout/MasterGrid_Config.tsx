import { ValueType } from 'realgrid';
import { GRIDSTYLETYPE } from '@vntgcorp/vntg-wdk-client';
// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'bugt_year',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '예산년도',
    editable: true,
    width: 80,
  },
  {
    fieldName: 'dept_code',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '예산부서',
    editable: true,
    width: 150,
  },
  {
    fieldName: 'bugt_amt',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '예산금액',
    editable: true,
    numberFormat: '#,##0',
    width: 120,
  },
  {
    fieldName: 'use_amt',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '예산실적',
    numberFormat: '#,##0',
    display: 'flex',
    width: 120,
  },
  {
    fieldName: 'remain_amt',
    dataType: ValueType.NUMBER,
    visible: true,
    headerText: '예산잔액',
    numberFormat: '#,##0',
    width: 120,
  },
  {
    fieldName: 'use_yn',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '사용여부',
    editable: true,
    width: 80,
  },
  {
    fieldName: 'remark',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '비고',
    editable: true,
    width: 290,
  },
  {
    fieldName: 'first_rg_yms',
    dataType: ValueType.DATETIME,
    visible: false,
  },
  {
    fieldName: 'first_rg_idf',
    dataType: ValueType.TEXT,
    visible: false,
  },
  {
    fieldName: 'last_update_yms',
    dataType: ValueType.DATETIME,
    visible: false,
  },
  {
    fieldName: 'last_update_idf',
    dataType: ValueType.TEXT,
    visible: false,
  },
];

import { SFType } from '@vntgcorp/vntg-wdk-client';
import { ValueType } from 'realgrid';

// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'edu_year',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '연도',
    width: 80,
  },
  {
    fieldName: 'cls',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '구분',
    width: 80,
  },
  {
    fieldName: 'edu_cost',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육비합계',
    width: 100,
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

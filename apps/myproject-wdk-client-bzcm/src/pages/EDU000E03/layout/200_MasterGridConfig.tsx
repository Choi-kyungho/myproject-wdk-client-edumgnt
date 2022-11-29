import { SFType } from '@vntgcorp/vntg-wdk-client';
import { values } from 'lodash';
import { ValueType } from 'realgrid';

// 마스터 그리드의 컬럼을 기술한다.
// 아래 5개 컬럼은 필수값 (백엔드에서 필요, 모든 테이블에 extend 되어 있음)
// first_rg_yms, first_rg_idf, last_update_yms, last_update_idf, row_stat

export const GridConfig = [
  {
    fieldName: 'dept_code',
    dataType: ValueType.TEXT,
    visible: true,
    editable: true,
    headerText: '부서코드',
    width: 80,
  },
  {
    fieldName: 'dept_name',
    dataType: ValueType.TEXT,
    visible: true,
    editable: true,
    headerText: '부서명',
    width: 150,
  },

  {
    fieldName: 'use_yn',
    dataType: ValueType.TEXT,
    visible: true,
    editable: true,
    headerText: '사용여부',
    width: 60,
  },

  {
    fieldName: 'valid_start_date',
    dataType: ValueType.DATE,
    visible: true,
    editable: true,
    headerText: '적용시작일',
    datetimeFormat: 'yyyy-MM-dd',
    width: 100,
  },

  {
    fieldName: 'valid_end_date',
    dataType: ValueType.DATE,
    visible: true,
    editable: true,
    headerText: '적용종료일',
    datetimeFormat: 'yyyy-MM-dd',
    width: 100,
  },

  {
    fieldName: 'parent_dept_code',
    dataType: ValueType.TEXT,
    visible: true,
    editable: true,
    headerText: '상위부서',
    width: 200,
  },
];

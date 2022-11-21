import { ValueType } from 'realgrid';

export const Config = [
  {
    fieldName: 'edu_year',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '기준년도',
    width: 105,
  },
  {
    fieldName: 'dept_code',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '부서코드',
    width: 80,
  },
  {
    fieldName: 'dept_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '부서명',
    width: 130,
  },
  {
    fieldName: 'emp_no',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '사번',
    width: 105,
  },
  {
    fieldName: 'emp_name',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '성명',
    width: 110,
  },
  {
    fieldName: 'edu_plan_hour',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육계획시간',
    width: 110,
  },
  {
    fieldName: 'edu_cmplt_hour',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육수료시간',
    width: 110,
  },
  {
    fieldName: 'edu_cmplt_rate',
    dataType: ValueType.TEXT,
    visible: true,
    headerText: '교육수료율',
    width: 110,
  },
  {
    fieldName: 'edu_cost_total',
    dataType: ValueType.TEXT,
    visible: false,
    headerText: '교육비합계',
    width: 110,
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

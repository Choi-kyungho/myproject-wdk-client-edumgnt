import { ValueType } from 'realgrid';

export const Config = [
  {
    fieldName: 'user_id',
    dataType: ValueType.TEXT,
    headerText: '사용자 ID',
    width: 100,
    editable: false,
    styleName: 'TextAlignLeft',
    visible: false,
  },
  {
    fieldName: 'group_sno',
    dataType: ValueType.TEXT,
    headerText: '그룹 일련번호',
    width: 100,
    editable: false,
    styleName: 'TextAlignLeft',
    visible: false,
  },
  {
    fieldName: 'group_name',
    dataType: ValueType.TEXT,
    headerText: '그룹 명',
    width: 200,
    editable: false,
    styleName: 'TextAlignLeft',
    visible: true,
  },
  {
    fieldName: 'system_type',
    dataType: ValueType.TEXT,
    headerText: '시스템 유형',
    width: 95,
    editable: false,
    visible: true,
  },
  {
    fieldName: 'use_yn',
    dataType: ValueType.TEXT,
    headerText: '사용 여부',
    width: 70,
    editable: false,
    visible: true,
  },
  {
    fieldName: 'remark',
    dataType: ValueType.TEXT,
    headerText: '비고',
    width: 200,
    editable: false,
    styleName: 'TextAlignLeft',
    visible: true,
  },
];

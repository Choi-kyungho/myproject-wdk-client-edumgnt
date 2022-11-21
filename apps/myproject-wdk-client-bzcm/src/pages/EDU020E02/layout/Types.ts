import React, { ReactNode } from 'react';
import { ValueType } from 'realgrid';

export type RowDataType = {
  emp_no: string;
  busi_place: string;
  corp_code: string;
  emp_name: string;
  dept_code: string;
  unit_work_no: string;
  plant_code: string;
  equip_code: string;
  unit_work_code: string;
  tel_no: string;
  mobile_no: string;
  email: string;
  ent_date: null;
  birthday: string;
  birthday_type: string;
  responsi: string;
  on_work_yn: 'Y' | 'N';
  user_id: string;
  row_stat: string;
  __rowState?: string;
};

export type GridConfigType = {
  fieldName: string;
  dataType?: ValueType;
  headerText?: string;
  header?: {
    text: string;
  };
  width?: number;
  editable?: boolean;
  textAlignment?: string;
  visible: boolean;
  datetimeFormat?: string;
  button?: string;
  isBtnAct?: boolean;
  numberFormat?: string;
  footer?: {
    expression: string;
    numberFormat: string;
  };
  validations?: {
    criteria: string;
    message: string;
    mode: string;
    level: string;
  };
  textFormat?: string;
  styleName?: string;
  editor?: { [name: string]: string | boolean | number | { [name: string]: string } };
  displayCallback?: (grid, index, value) => undefined | Date | number | string;
  styleCallback?: (grid, dataCell) => { styleName: string };
};



export type MasterGridProps = {
  title: string;
  busiCode: string;
  originRows: RowDataType[];
  onSelectRow?: (data?) => void;
  saveData?: RowDataType[];
  styles?: React.CSSProperties;
  gotoNext?: () => void;
  onAddRow?: () => void;
  ref?: ReactNode;
  onSetUnitWorkNumber: (plant, equip, unit) => void;
};

export type SearchProps = {
  onChangeEduYear: (name, value) => void;
  ref: ReactNode;
  button: string;
};

type Handler = {
  cleanup: () => void;
};

export type SearchHandler = Handler & {
  submit: () => void;
};

export type ModalHandler = Handler & {
  confirm: () => [];
};

export type DetailGridRowDataType = {
  emp_no?: string;
  emp_name?: string;
  user_id?: string;
  dept_code?: string;
  dept_name?: string;
  job?: string;
  job_name?: string;
  responsi?: string;
  responsi_name?: string;
  phon_number?: string;
  email?: string;
  use_yn?: string;
  row_stat?: 'added' | 'unchanged' | 'modified' | 'deleted';
};


export type FormProps = {
  search_text: string;
  use_yn: string;
  dept_code: string,
  dept_name: string,
  responsi_name: string,
  job_name: string,
  edu_year: string,
  cmplt_yn: string,
  emp_no: string,
};

export type ModalSearchFormProps = {
  search_text: string;
  use_yn: string;
};

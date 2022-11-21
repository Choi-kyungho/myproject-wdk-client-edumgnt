export type MasterGridRowDataType = {
  group_sno: number;
  group_name: string;
  system_type: string;
  use_yn: string;
  remark?: string | null;
  row_stat?: 'added' | 'unchanged' | 'modified' | 'deleted';
};

// export type DetailGridRowDataType = {
//   group_sno?: number;
//   user_id?: string;
//   user_name?: string;
//   user_level?: string;
//   emp_no?: string;
//   remark?: string | null;
//   row_stat?: 'added' | 'unchanged' | 'modified' | 'deleted';
// };

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

type Handler = {
  cleanup: () => void;
};

export type MasterGridHandler = Handler & {
  toSave: () => MasterGridRowDataType[];
};

export type DetailGridHandler = Handler & {
  toSave: () => DetailGridRowDataType[];
  changeData: () => number;
};

export type SearchHandler = Handler & {
  submit: () => void;
};

export type ModalHandler = Handler & {
  confirm: () => [];
};

export type FormProps = {
  search_text: string;
  use_yn: string;
  dept_code: string,
  responsi: string,
  responsi_name: string,
  job: string,
  job_name: string,
};

export type ModalSearchFormProps = {
  search_text: string;
  use_yn: string;
};

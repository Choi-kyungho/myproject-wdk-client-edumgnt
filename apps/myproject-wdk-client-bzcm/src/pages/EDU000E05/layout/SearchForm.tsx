import { Field, Form, getDate, SearchRow, SFType, useForm } from '@vntgcorp/vntg-wdk-client';
import React from 'react';
import * as yup from 'yup';

type SearchFormProps = {};
export type SearchFormForwardFunc = {
  cleanup: () => void;
  submit: () => void;
};

const SearchForm = React.forwardRef<SearchFormForwardFunc, SearchFormProps>(({}, ref) => {
  /**
   *  Forward Ref 를 통한 이벤트 선언부
   */

  /**
   * default value 설정
   */
  const defaultValues = {};

  /**
   * useForm hook
   */
  const form = useForm({ defaultValues });

  // React.useImperativeHandle(ref, () => ({
  //   cleanup() {
  //     // 초기화 함수
  //     console.log('searchForm cleanup');
  //   },
  //   submit() {
  //     // 보내기 함수
  //     console.log('seachForm submit');
  //   },
  // }));
  React.useImperativeHandle(ref, () => ({
    cleanup() {
      console.log('searchForm cleanup');
      // 초기화 함수
      form.reset();
    },
    submit() {
      // 보내기 함수
      console.log('seachForm submit');
      return form.getValues();
    },
  }));

  return (
    <React.Fragment>
      <Form {...form} formType="search" formName="EDU000E05-굥규 기관 등록">
        <SearchRow>
          <Field
            type={SFType.Text}
            label="교육기관 ID"
            labelStyles={{ width: 110 }}
            name="edu_code_id"
            styles={{ width: '100px' }}
          ></Field>
          <Field
            type={SFType.Text}
            label="교육기관 명"
            labelStyles={{ width: 110 }}
            name="edu_code_name"
            styles={{ width: '100px' }}
          ></Field>
        </SearchRow>
      </Form>
    </React.Fragment>
  );
});
export default SearchForm;

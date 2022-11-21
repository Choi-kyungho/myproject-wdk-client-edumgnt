import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useForm } from '@vntgcorp/vntg-wdk-client';
import { SFType } from '@vntgcorp/vntg-wdk-client';
import * as yup from 'yup';
import { Form, Field, SearchRow } from '@vntgcorp/vntg-wdk-client';

type SearchFormProps = {};
export type SearchFormForwardFunc = {
  cleanup: () => void;
  submit: () => void;
};

const SearchForm = React.forwardRef<SearchFormForwardFunc, SearchFormProps>(({}, ref) => {
  const defaultValues = {
    EDU_YEAR: `${new Date().getFullYear()}`,
  };

  /**
   *  Forward Ref 를 통한 이벤트 선언부
   */
  React.useImperativeHandle(ref, () => ({
    cleanup() {
      // 초기화 함수
      form.reset();
    },
    submit() {
      // 보내기 함수

      return form.getValues();
    },
  }));

  /**
   * useForm hook
   */
  const form = useForm({ defaultValues });

  // search form은 SearchRow에 대한 type, name, label만 기술해준다 (조회 파라미터로 사용할 것들)
  // 나머지 복붙
  return (
    <React.Fragment>
      <Form {...form} formType="search" formName="EDU010E01-교육계획/실적 등록">
        <SearchRow>
          <Field type={SFType.Yearpicker} label="교육년도" name="EDU_YEAR"></Field>
          <Field type={SFType.Text} label="교육명" name="EDU_NAME" styles={{ width: '200px' }}></Field>
          <Field type={SFType.Text} label="사원명" name="EMP_NAME" styles={{ width: '200px' }}></Field>
        </SearchRow>
      </Form>
    </React.Fragment>
  );
});
export default SearchForm;

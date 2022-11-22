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
    bugt_year: `${new Date().getFullYear()}`,
    dept_code: '%',
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
      <Form {...form} formType="search" formName="EDU000E06-교육비예산등록">
        <SearchRow>
          <Field
            type={SFType.Yearpicker}
            label="예산년도"
            name="bugt_year"
            styles={{ width: '100px' }}
          ></Field>
          <Field
            type={SFType.Selectbox}
            label="예산부서"
            labelStyles={{ width: 110 }}
            name="dept_code"
            styles={{ width: '200px' }}
            code={'CM10'}
            needAlloption={true}
          ></Field>
        </SearchRow>
      </Form>
    </React.Fragment>
  );
});
export default SearchForm;

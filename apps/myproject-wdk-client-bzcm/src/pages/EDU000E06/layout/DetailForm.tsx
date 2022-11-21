import { DetailRow, DetailTitle, Field, Form, getDate, SFType, useForm } from '@vntgcorp/vntg-wdk-client';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { ThemeConsumer } from 'styled-components';
import { createSecureContext } from 'tls';
import * as yup from 'yup';

type DetailFormProps = {
  onChangeData: (name: string, value: string) => void;
};

type DetailFormForwardFunc = {
  cleanup: () => void;
  submit: () => any;
  changeData: (any) => void;
};

const DetailForm = React.forwardRef<DetailFormForwardFunc, DetailFormProps>(({ onChangeData }, ref) => {
  React.useImperativeHandle(ref, () => ({
    cleanup() {
      // 초기화 함수
      form.reset();
    },
    submit() {
      // 제출 함수 호출
      //   console.log(detailGridRef.current.getData());
    },
    changeData(value) {},
  }));

  const checkOptions = [{ detail_code_id: 'Y', detail_code_name: '' }];

  const form = useForm({});
  /*
   * Rendering mount 시 초기화
   */

  const onElementChange = (e) => {
    e.stopPropagation();
    onFieldChange(e.target.name, e.target.value);
  };

  const onFieldChange = (name, value) => {
    onChangeData(name, value);
  };

  return (
    <React.Fragment>
      <Form {...form} formType="detail" formName="EDU000E06-교육일정등록" useTable="Y">
        {/* <DetailTitle title="교육일정등록">
          <DetailRow>
            <Field
              required
              label="교육년도"
              name={'edu_year'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '100px' }}
              onChange={onFieldChange}
              type={SFType.Yearpicker}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="시작기간"
              name={'edu_from_dt'}
              type={SFType.Datepicker}
              labelStyles={{ width: '200px' }}
              styles={{ width: '100px' }}
              onChange={onFieldChange}
            />
            <Field
              required
              label="종료기간"
              name={'edu_to_dt'}
              type={SFType.Datepicker}
              labelStyles={{ width: '200px' }}
              onChange={onFieldChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="마감여부"
              name={'close_yn'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '100px' }}
              onChange={onFieldChange}
              type={SFType.Checkbox}
              options={checkOptions}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="비고"
              name={'rmk'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '300px' }}
              onChange={onElementChange}
              type={SFType.Text}
              colspan={2}
            />
          </DetailRow>
        </DetailTitle> */}
      </Form>
    </React.Fragment>
  );
});

export default DetailForm;

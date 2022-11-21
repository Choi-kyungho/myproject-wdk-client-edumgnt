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

      // 수료여부 체크박스 초기화
      form.setValue('edu_cmplt_yn@@Y', null);
      // 불참여부 체크박스 초기화
      form.setValue('edu_absence_yn@@Y', null);
    },
    submit() {
      // 제출 함수 호출
      //   console.log(detailGridRef.current.getData());
    },
    changeData(value) {
      const date_from = new Date(value.edu_from_dt);
      value.edu_from_dt = getDate(date_from.toString());
      form.setValues(value);

      const date_to = new Date(value.edu_to_dt);
      value.edu_to_dt = getDate(date_to.toString());
      form.setValues(value);

      form.setValue('edu_cmplt_yn@@Y', value.edu_cmplt_yn);
      form.setValue('edu_absence_yn@@Y', value.edu_absence_yn);
    },
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
      <Form {...form} formType="detail" formName="EDU010E01-교육계획/실적등록" useTable="Y">
        <DetailTitle title="교육 계획/실적">
          <DetailRow>
            <Field
              label="교육계획등록번호"
              name={'edu_plan_no'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              readOnly={true}
            />
            <Field
              label="교육일정번호"
              name={'edu_schedule_no'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              readOnly={true}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="교육년도"
              name={'edu_year'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
              type={SFType.Yearpicker}
              readOnly={true}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="사번"
              name={'emp_no'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              readOnly={true}
            />
            <Field
              label="사원명"
              name={'emp_name'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              readOnly={true}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="부서"
              name={'dept_code'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              readOnly={true}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육명"
              name={'edu_name'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '250px' }}
              onChange={onElementChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육시작일자"
              name={'edu_from_dt'}
              type={SFType.Datepicker}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
            <Field
              required
              label="교육종료일자"
              name={'edu_to_dt'}
              type={SFType.Datepicker}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육시간"
              name={'edu_time'}
              type={SFType.Number}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
            />
            <Field
              required
              label="교육형태"
              name={'edu_type'}
              type={SFType.Selectbox}
              code={'EDU01'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육대분류"
              name={'edu_large_class'}
              type={SFType.Selectbox}
              code={'EDU02'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
            <Field
              required
              label="교육중분류"
              name={'edu_middle_class'}
              type={SFType.Selectbox}
              code={'EDU03'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육주관"
              name={'edu_supervision'}
              type={SFType.Selectbox}
              code={'EDU06'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
            />
            <Field
              required
              label="교육장소"
              name={'edu_location'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              required
              label="교육비"
              name={'edu_cost'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
              type={SFType.Number}
              colspan={2}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="수료여부"
              name={'edu_cmplt_yn'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
              type={SFType.Checkbox}
              options={checkOptions}
            />
            <Field
              label="교육이행율(%)"
              name={'edu_rate'}
              type={SFType.Number}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
            />
          </DetailRow>
          
          {/* <DetailRow>
            <Field
              label="첨부"
              name={'edu_attach_id'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '300px' }}
              onChange={onElementChange}
              type={SFType.Text}
              colspan={2}
            />
          </DetailRow> */}
          <DetailRow>
            <Field
              label="불참여부"
              name={'edu_absence_yn'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onFieldChange}
              type={SFType.Checkbox}
              options={checkOptions}
            />
            <Field
              label="불참사유"
              name={'edu_absence_reason'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '150px' }}
              onChange={onElementChange}
            />
          </DetailRow>
          <DetailRow>
            <Field
              label="비고"
              name={'rmk'}
              labelStyles={{ width: '200px' }}
              styles={{ width: '250px' }}
              onChange={onElementChange}
              type={SFType.Text}
              colspan={2}
            />
          </DetailRow>
        </DetailTitle>
      </Form>
    </React.Fragment>
  );
});

export default DetailForm;

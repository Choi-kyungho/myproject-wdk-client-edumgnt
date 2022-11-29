import { DetailRow, DetailTitle, ESGrid, Field, Form, getDate, LEField, Modal, SFType, useForm } from '@vntgcorp/vntg-wdk-client';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ThemeConsumer } from 'styled-components';
import { createSecureContext } from 'tls';
import * as yup from 'yup';
import { FileUploader, FileUploadType } from '@vntgcorp/vntg-wdk-client';
import { UPLOADERSTAT } from '@vntgcorp/vntg-wdk-client/dist/app/src/components/molecules/FileUploader/FileUploader';
import { GridRow } from '@vntgcorp/vntg-wdk-client';

let masterGrid: ESGrid | any;
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';

type DetailFormProps = {
  onChangeData: (name: string, value: string) => void;
  row: GridRow;
  props: any;
};

export type DetailFormForwardFunc = {
  cleanup: () => void;
  submit: () => any;
  changeData: (any) => void;
  getData: () => GridRow;
};

export const getGridValues = () => {
  const updateRows = masterGrid.getCudRows();
  return updateRows;
};

const DetailForm = React.forwardRef<DetailFormForwardFunc, DetailFormProps>(({ onChangeData, row, props }, ref) => {

  console.log('Detail :::: ' + JSON.stringify(props.edu_rate));
  const [edu_attach, setEduAttach] = useState<any>();
  const [fileName, setFileName] = useState<string>('');

  const [percent, setPercent] = useState<number>(0);

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 1;
      if (newPercent > 100) {
        return 100;
      }

      form.setValue('edu_rate', newPercent);

      return newPercent;
    });
  };

  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 1;
      if (newPercent < 0) {
        return 0;
      }

      form.setValue('edu_rate', newPercent);
      onFieldChange('edu_rate', newPercent);

      return newPercent;
    });
  };      

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
    setEmpInfo(value) {
      form.setValue('emp_name', value.emp_name);
      form.setValue('dept_code', value.dept_code);
    },
    setMaxEduScheduleNo(value) {
      form.setValue('edu_schedule_no', value.edu_schedule_no);
    },
	// 첨부파일
    getData() {
      const values = form.getValues();
      return { ...row, value: { ...edu_attach, ...values } };
    },
  }));

  useEffect(() => {
    if (row === undefined || row === null) return;

    setEduAttach(row.value);
    setFileName(row.value.edu_file_name);

    for (const [_, key] of Object.entries('edu_attach_id')) {
      type oKey = keyof typeof row;
      let value = row[key as oKey] as any;
      let _key = key;

      value = value ? value : null;

      form.setValue(_key, value);
    }
  }, [row]);

  useEffect(() => {
    fileUploaderCallback('edu_attach_id', 0, props.edu_attach_id);
    setPercent(props.edu_rate);
  }, [props]);

  // 첨부파일
  useEffect(() => {
    form.setValues(edu_attach);
  }, [edu_attach]);

  const fileUploaderCallback = (_colunmName: string, stat: UPLOADERSTAT, attachid: string) => {
    if (stat === UPLOADERSTAT.NEWFILE) {
      if (attachid) {
        onChangeData(_colunmName, attachid);
        form.setValue(_colunmName, attachid);
      }
    } else if (stat === UPLOADERSTAT.DELFILE) {
      onChangeData(_colunmName, null);
      form.setValue(_colunmName, '');
    }
  };
  
  const checkOptions = [{ detail_code_id: 'Y', detail_code_name: '' }];

  const form = useForm({});
  /*
   * Rendering mount 시 초기화
   */

  const onElementChange = (e) => {
    e.stopPropagation();
    onFieldChange(e.target.name, e.target.value);
    console.log('1 ::: ' + e.target.name);
    console.log('2 ::: ' + e.target.value);

    if(e.target.name == 'edu_rate'){
      setPercent(e.target.value);
    }
  };

  const onFieldChange = (name, value) => {
    if (name == 'edu_cmplt_yn@@Y' && value) {
      form.setValue('edu_rate', 100);
      onChangeData('edu_rate', '100');
    } else if (name == 'edu_rate' && value == 100) {
      form.setValue('edu_cmplt_yn@@Y', 'Y');
      onChangeData('edu_cmplt_yn@@Y', 'true');
    }

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
              type={SFType.Selectbox}
              code={'CM10'}
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
              colspan={2}
              name={'edu_name'}
              type={SFType.Text}
              labelStyles={{ width: '200px' }}
              styles={{ width: '400px' }}
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
            
          </DetailRow>   
		  <DetailRow>
            <LEField label="첨부">
              <FileUploader
                type={FileUploadType.INPUT}
                styles={{ paddingBottom: '10px', width: 195 }}
                attachID={form.getValues().edu_attach_id}
                callBack={(stat, attachid) => fileUploaderCallback('edu_attach_id', stat, attachid)}
                filename={fileName}
              />
            </LEField>
          </DetailRow>
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
              styles={{ width: '400px' }}
              onChange={onElementChange}
              type={SFType.Text}
              colspan={2}
            />
          </DetailRow>
          <DetailRow>
            <Field
                label="교육이행율(%)"
                name={'edu_rate'}
                type={SFType.Number}
                labelStyles={{ width: '200px' }}
                styles={{ width: '150px' }}
                onChange={onElementChange}
              />
          </DetailRow>
        </DetailTitle>
      </Form>
      
      <div style={{padding: '30px 15px 0px 15px'}}>
        <p style={{fontSize: '18px', fontWeight: '600'}}>교육이행율(%)</p>
        <Progress percent={percent} />
        <Button.Group>
          <Button onClick={decline} icon={<MinusOutlined />} />
          <Button onClick={increase} icon={<PlusOutlined />} />
        </Button.Group>
      </div>
    </React.Fragment>
  );
});

export default DetailForm;

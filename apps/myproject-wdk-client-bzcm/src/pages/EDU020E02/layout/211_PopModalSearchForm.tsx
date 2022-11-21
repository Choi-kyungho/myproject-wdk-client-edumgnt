import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { Button, useForm } from "@vntgcorp/vntg-wdk-client";
import { SFType } from "@vntgcorp/vntg-wdk-client";
import { Form, Field, SearchRow } from "@vntgcorp/vntg-wdk-client";
import * as yup from "yup";
import { ModalSearchFormProps } from "./Types";
import { FormProps } from "./Types";

type SearchProps = {
  onSubmit?: (data: FormProps) => void;
  ref?: React.ReactNode;
  props?: any;
};

const ModalSearch: React.FC<SearchProps> = forwardRef(({ onSubmit, props,}, ref) => {
  /**
   * default value 설정
   */

  console.log("서치폼 props = ===== =  = =>" + JSON.stringify(props));

  const defaultValues = {
    search_text: "",
    dept_code: props.dept_code != '' ? props.dept_code : '',
    edu_year: props.연도 != '' ? props.연도 : '',
    cmplt_yn: "",
  };

  /**
   * validation schema
   */
  const schema = useMemo(() => {
    return yup.object({
      search_text: yup.string(),
    });
  }, []);

  /**
   * useForm hook
   */
  const form = useForm({ defaultValues, schema });

  const handleSubmit = form.handleSubmit(onSubmit);

  useImperativeHandle(ref, () => ({
    cleanup() {
      form.reset();
    },
    submit() {
      handleSubmit();
    },
  }));

  return (
    <React.Fragment>
      <Form
        {...form}
        onSubmit={handleSubmit}
        formType="search"
        formName="COMM030E02-메뉴 등록"
        styles={{ margin: "5px 0px 5px 0px" }}
      >
        <SearchRow>
          <Field type={SFType.Yearpicker} 
            label=" 기준년도" 
            name="edu_year">
          </Field>
          <Field
            type={SFType.Text}
            label="성명"
            name="search_text"
            // labelStyles={{ width: "70px" }}
          ></Field>
          <Field
            type={SFType.Selectbox}
            name={'dept_code'}
            label={'부서'}
            code={'CM10'}
            needAlloption={true}
          ></Field>
          <Field
            type={SFType.Selectbox}
            name={'cmplt_yn'}
            label={'수료여부'}
            options={[
              { detail_code_id: "Y", detail_code_name: "완료" },
              { detail_code_id: "N", detail_code_name: "미완료" },
            ]}
            needAlloption={true}
          ></Field> 
          {/* <Button></Button> */}
        </SearchRow>
      </Form>
    </React.Fragment>
  );
});

export default ModalSearch;

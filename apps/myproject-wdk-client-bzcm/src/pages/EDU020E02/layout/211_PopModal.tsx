import React, { MouseEventHandler, useRef, useState } from 'react';
import { ModalTitle } from '@vntgcorp/vntg-wdk-client';
import ModalSearch from './211_PopModalSearchForm';
import ModalGrid from './211_PopModalGrid';
import { SearchHandler, ModalHandler, DetailGridRowDataType } from './Types';
import './programSearchModal.css';
import styled from 'styled-components';
import { IResData as IHttpResData, useSyncHttpCient } from '@vntgcorp/vntg-wdk-client';
import ApiCall from '../action/api';
import { warning } from '@vntgcorp/vntg-wdk-client';
import _ from 'lodash';
//import Button from '@mui/material/core';
import {
  Button
} from "@material-ui/core";
import SendIcon from '@material-ui/core';

const ModalSearchWrap = styled.section`
    padding-top:10px;
  `;

type PopModalProps = {
  onModalClose?: () => void;
  selectDataValue?: (data: any) => void;
  ref?: React.ReactNode;
  detailRows?: DetailGridRowDataType[] | null;
  searchParam?: any;
};         
let currDetailRows: DetailGridRowDataType[];
let addDetailRows: DetailGridRowDataType | DetailGridRowDataType[];
let tempDetailRows: DetailGridRowDataType[] = [];
const PopModal: React.FC<PopModalProps> = ({ onModalClose, selectDataValue, detailRows, searchParam }) => {
  const modalSearchRef = useRef<SearchHandler>(null);
  const modalRef = useRef<ModalHandler>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRows, setModalRows] = useState([]);

  const [mailInfo, setMailInfo] = useState({});
  const [sendResult, setSendResult] = useState({});

  // eslint-disable-next-line no-empty-pattern
  const [{}, fetchRequest] = useSyncHttpCient<IHttpResData>();
  const [api] = useState(new ApiCall(fetchRequest));


  const selectRow = (data: DetailGridRowDataType[]) => {
    // console.log('data===>'+JSON.stringify(data));

    // setMailInfo(data);

    // console.log('보내기전==>'+JSON.stringify(mailInfo));
    // clickEvent();
  };


  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };

  const deleteConfirm = () => {
    console.log(JSON.stringify(mailInfo));
    alert("메일이 전송되었습니다.");
    api.mailSendModal(mailInfo).then((res) => {
    });
  }

  const cancelConfirm = () => {
    alert("취소했습니다.");
  }

  const confirmDelete = useConfirm(
    "선택된 사원에게 메일을 전송하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  const eventTest = (el) =>{
    setMailInfo(el);
  }

  React.useEffect(() => {
  }, [mailInfo]);

  const onCleanup = () => {
    modalSearchRef.current.cleanup();
    modalRef.current.cleanup();
  };

  const onRetriveData = () => {
    modalSearchRef.current.submit();
  };

  /**
   *
   */
  type FormProps = {
    search_text: string;
    dept_code: string;
    dept_name: string;
    responsi_name: string;
    job_name: string;
    edu_year: string;
    cmplt_yn: string;
    emp_no: string;
  };

  const onSubmit = (data: FormProps) => {

    /**
     * search_text: 그룹 명
     */
    const searchvalue = {
      p_emp_name: data.search_text === '' ? '%' : data.search_text,
      p_dept_code: data.dept_code === '' ? '%' : data.dept_code,
      p_edu_year: data.edu_year === '' ? '%' : data.edu_year,
      p_cmplt_yn: data.cmplt_yn === '' ? '%' : data.cmplt_yn,
    };
    
    api.retriveModal(searchvalue).then((res) => {
        console.log(JSON.stringify(res.data));
        setModalRows(res.data);
    });
  };

  const onSubmit_first = (data: FormProps) => {
    /**
     * search_text: 그룹 명
     */
    console.log("onSubmit_first===>"+JSON.stringify(searchParam));
    
    const searchvalue = {
      p_edu_year: data.edu_year == undefined ? searchParam.연도
                : data.edu_year != undefined ? data.edu_year
                : '%' ,
      p_emp_name: data.search_text === '' ? '%' : data.search_text,
      p_dept_code: data.dept_code == undefined ? searchParam.dept_code
                 : data.dept_code != undefined ? data.dept_code
                 : '%' ,
      p_cmplt_yn : '%',
      p_emp_no: data.emp_no == undefined ? searchParam.emp_no
                 : data.emp_no != undefined ? data.emp_no
                 : '%' ,
    };

    api.retriveModal(searchvalue).then((res) => {
        setModalRows(res.data);
    });
  };


  const onClose = () => {
    onModalClose();    
    setModalVisible(false);
  };

  React.useEffect(()=>{
    // 컴포넌트 로드시 파라미터 받아 1번만 실행
    onSubmit_first(searchParam);
  },[])

  

  return (
    <div className={modalVisible ? 'openModal programSearchModal' : 'programSearchModal'}>
      {modalVisible && (
        <section>
          <ModalTitle
            title="교육현황조회"
            onCleanup={onCleanup}
            useCleanup={false}
            onRetrive={onRetriveData}
            useRetrive={true}
            onClose={onClose}
          ></ModalTitle>
          <main>
            <ModalSearch onSubmit={onSubmit} ref={modalSearchRef} props={searchParam}></ModalSearch>
            <ModalGrid originRows={modalRows} onSelectRow={selectRow} ref={modalRef} propsEvn={eventTest}></ModalGrid>
             <Button variant="contained" onClick={confirmDelete} 
             style={{float:'right', width:'120px', marginTop:'15px', marginBottom: '15px', backgroundColor: 'orange', fontWeight:'bold', color: '#FFFFFF'}}>
              메일발송
            </Button>
          </main>
        </section>
      )}
    </div>
  );
};
export default PopModal;

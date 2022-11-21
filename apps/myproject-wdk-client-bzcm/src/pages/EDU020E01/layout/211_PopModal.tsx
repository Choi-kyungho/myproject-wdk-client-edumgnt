import React, { useRef, useState } from 'react';
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
const PopModal: React.FC<PopModalProps> = ({ onModalClose, selectDataValue, detailRows ,searchParam }) => {
  const modalSearchRef = useRef<SearchHandler>(null);
  const modalRef = useRef<ModalHandler>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRows, setModalRows] = useState([]);

  // eslint-disable-next-line no-empty-pattern
  const [{}, fetchRequest] = useSyncHttpCient<IHttpResData>();
  const [api] = useState(new ApiCall(fetchRequest));

  const selectRow = (data: DetailGridRowDataType[]) => {
    onModalClose();
    setModalVisible(false);
    selectDataValue(data);
  };

  const onCleanup = () => {
    //searchParam = null;
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
    responsi: string;
    responsi_name: string;
    job: string;
    job_name: string;
  };

  const onSubmit = (data: FormProps) => {
    /**
     * search_text: 그룹 명
     */

    const searchvalue = {
      p_emp_name: data.search_text === '' ? '%' : data.search_text,
      p_dept_code: data.dept_code === '' ? '%' : data.dept_code,
      p_responsi_name: data.responsi_name === '' ? '%' : data.responsi_name,
      p_job_name: data.job_name === '' ? '%' : data.job_name,
    };

    console.log('search val ===> '+JSON.stringify(searchvalue));
    
    api.retriveModal(searchvalue).then((res) => {
        setModalRows(res.data);
    });
  };

  const onSubmit_first = (data: FormProps) => {
    /**
     * search_text: 그룹 명
     */

    const searchvalue = {
      p_emp_name: data.search_text === '' ? '%' : data.search_text,
      p_dept_code: data.dept_code == undefined ? searchParam.dept_code
                 : data.dept_code != undefined ? data.dept_code
                 : '%' ,
      p_responsi_name: data.responsi === undefined ? searchParam.responsi
                     : data.responsi != undefined ? data.responsi
                     : '%',
      p_job_name: data.job == undefined ? searchParam.job
                : data.job != undefined ? data.job
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
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={modalVisible ? 'openModal programSearchModal' : 'programSearchModal'}>
      {modalVisible && (
        <section>
          <ModalTitle
            title="사원 조회"
            onCleanup={onCleanup}
            useCleanup={false}
            onRetrive={onRetriveData}
            useRetrive={true}
            onClose={onClose}
          ></ModalTitle>
          <main>
            <ModalSearch onSubmit={onSubmit} ref={modalSearchRef} props={searchParam}></ModalSearch>
            <ModalGrid originRows={modalRows} onSelectRow={selectRow} ref={modalRef}></ModalGrid>
          </main>
        </section>
      )}
    </div>
  );
};
export default PopModal;

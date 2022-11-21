import { ESGrid, getDate, GridHdBtnType, GridHeader, userInfoGlobalState, useConfirm } from '@vntgcorp/vntg-wdk-client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { GridConfig } from './MasterGrid_Config';
import { v4 as uuid } from 'uuid';
import { getUniqueValue } from '@vntgcorp/vntg-wdk-client';

type MasterGridProps = {
  originRows: Array<any>;
  onSelectData: (value) => void;
  /**  */
};

type GridForwardFunc = {
  cleanup: () => void;
  save: () => any;
  changeData: (name: string, value: string) => void;
};

const MasterGrid = React.forwardRef<GridForwardFunc, MasterGridProps>(({ originRows, onSelectData }, ref) => {
  /**
   * Ref. 를 통한 이벤트 전달함수
   */
  React.useImperativeHandle(ref, () => ({
    cleanup() {
      masterGrid.current.clearnRow();
    },
    save() {
      return masterGrid.current.getCudRows();
    },
    changeData(name, value) {
      if (selectedRowIndex != null) {
        // if (name == 'close_yn@@Y') {
        //   if (value.toString() == 'true') {
        //     masterGrid.current.setValue(selectedRowIndex, 'close_yn', 'Y');
        //   } else {
        //     masterGrid.current.setValue(selectedRowIndex, 'close_yn', 'N');
        //   }
        // } else {
        masterGrid.current.setValue(selectedRowIndex, name, value);
        // }
      }
    },
  }));
  const masterGrid = React.useRef<ESGrid>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);

  React.useEffect(() => {
    masterGrid.current = new ESGrid('EDU000E05GRID');
    masterGrid.current.initializeGrid(GridConfig, originRows);
    masterGrid.current.setBoolColumn('use_yn', 'Y', false);
    masterGrid.current.setNumberEditor(['sort_seq']);

    masterGrid.current.setRows(originRows);

    masterGrid.current.onCurrentRowChanged((row) => {
      setSelectedRowIndex(row._row.index);
      onSelectData(row.value);
    });

    return () => {
      masterGrid.current.destroy();
    };
  }, []);

  useEffect(() => {
    masterGrid.current.setRows(originRows);
  }, [originRows]);

  const gridBtnEvent = (type: any) => {
    switch (type) {
      case GridHdBtnType.plus: {
        const thisYear = new Date().getFullYear();
        masterGrid.current.insertRow({
          edu_code_id: '자동채번',
          // edu_code_id: getUniqueValue(),
          cm_code_type_id: 'EDU06',
          url: null,
          addr: null,
          business_no: null,
          president: null,
          tel_no: null,
          remarks: null,
          use_yn: 'Y',
          sort_seq: null,
          // edu_code_id: getUniqueValue(),
          // cm_code_type_id: 'EDU06',
          // url: '-',
          // addr: '-',
          // business_no: '-',
          // president: '-',
          // tel_no: '-',
          // remarks: '-',
          // use_yn: 'Y',
        });
        break;
      }
      case GridHdBtnType.minus: {
        masterGrid.current.getGridView().cancel();
        masterGrid.current.deleteRow();
        break;
      }
      case GridHdBtnType.reflash: {
        masterGrid.current.getGridView().cancel();
        masterGrid.current.setRows(originRows);
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className="grid">
      <GridHeader title={'교육 기관 목록'} type="default" gridBtnEvent={gridBtnEvent} />
      <div className="realGrid" id="EDU000E05GRID"></div>
    </div>
  );
});

export default MasterGrid;

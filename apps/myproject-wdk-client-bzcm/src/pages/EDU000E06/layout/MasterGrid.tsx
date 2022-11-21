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

const dumyData = [
  {
    emp_name: 'Tester',
    exec_ctnt: '테스트 등록 관련 입력을 했습니다.',
  },
];

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
      console.log('save ----> ');
      return masterGrid.current.getCudRows();
    },
    changeData(name, value) {
      console.log('changeData ----> ', name);
      if (selectedRowIndex != null) {
        if (name == 'close_yn@@Y') {
          const inputData = name.split('@@');

          if (value.toString() == 'true') {
            masterGrid.current.setValue(selectedRowIndex, inputData[0], 'Y');
          } else {
            masterGrid.current.setValue(selectedRowIndex, inputData[0], 'N');
          }
        } else {
          masterGrid.current.setValue(selectedRowIndex, name, value);
        }
      }
    },
  }));
  const masterGrid = React.useRef<ESGrid>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);

  React.useEffect(() => {
    masterGrid.current = new ESGrid('EDU000E06GRID');
    masterGrid.current.initializeGrid(GridConfig, originRows);

    masterGrid.current.setBoolColumn('use_yn', 'Y', false);
    masterGrid.current.setNumberEditor(['bugt_amt']);
    masterGrid.current.setRows(originRows);
    masterGrid.current.setLookup('dept_code', 'CM10');

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
          bugt_year: thisYear,
          dept_code: '0001',
          bugt_amt: 0,
          use_amt: 0,
          remain_amt: 0,
          remark: null,
          use_yn: 'Y',
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
      <GridHeader title={'교육비예산등록'} type="default" gridBtnEvent={gridBtnEvent} />
      <div className="realGrid" id="EDU000E06GRID"></div>
    </div>
  );
});

export default MasterGrid;

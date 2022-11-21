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
      return masterGrid.current.getCudRows();
    },
    changeData(name, value) {
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
    masterGrid.current = new ESGrid('EDU000E04GRID');
    masterGrid.current.initializeGrid(GridConfig, originRows);
    // masterGrid.current.setBoolColumn('close_yn', 'N', false);

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
          edu_schedule_no: getUniqueValue(),
          edu_year: thisYear,
          edu_from_dt: new Date(thisYear, 0),
          edu_to_dt: new Date(thisYear, 11, 31),
          close_yn: 'N',
          rmk: null,
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
      <GridHeader title={'교육일정 목록'} type="default" gridBtnEvent={gridBtnEvent} />
      <div className="realGrid" id="EDU000E04GRID"></div>
    </div>
  );
});

export default MasterGrid;

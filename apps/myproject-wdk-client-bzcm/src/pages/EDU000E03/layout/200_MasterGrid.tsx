import {
  ESGrid,
  Field,
  getDate,
  GridHdBtnType,
  GridHeader,
  SFType,
  userInfoGlobalState,
} from '@vntgcorp/vntg-wdk-client';
import React, { useEffect, useState } from 'react';
import { GridConfig } from './200_MasterGridConfig';
import { v4 as uuid } from 'uuid';
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
        masterGrid.current.setValue(selectedRowIndex, name, value);
      }
    },
  }));
  const masterGrid = React.useRef<ESGrid>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);

  React.useEffect(() => {
    masterGrid.current = new ESGrid('EDU000E03GRID');
    masterGrid.current.initializeGrid(GridConfig, originRows);
    masterGrid.current.setBoolColumn('use_yn', 'Y', true);

    masterGrid.current.setLookup('parent_dept_code', 'CM10');

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

  // + 버튼 눌렀을때 기본값 세팅
  // MasterGrid.tsx에선 아래 초기화 값 부분만 변경하고 나머지는 공통이기 때문에 따로 수정하지 않아도 된다.
  const gridBtnEvent = (type: any) => {
    switch (type) {
      case GridHdBtnType.plus: {
        masterGrid.current.insertRow({
          dept_code: '',
          dept_name: '',
          use_yn: 'Y',
          valid_start_date: getDate(new Date().toString()),
          valid_end_date: '9999-12-31',
          parent_dept_code: '0001',
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
        console.log('reflash');
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className="grid">
      <GridHeader title={'부서 목록'} type="default" gridBtnEvent={gridBtnEvent} />
      <div className="realGrid" id="EDU000E03GRID"></div>
    </div>
  );
});

export default MasterGrid;

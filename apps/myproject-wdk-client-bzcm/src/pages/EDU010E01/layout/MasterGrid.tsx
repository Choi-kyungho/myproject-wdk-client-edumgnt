import { ESGrid, getDate, GridHdBtnType, GridHeader, userInfoGlobalState, useConfirm } from '@vntgcorp/vntg-wdk-client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { GridConfig } from './MasterGrid_Config';
import { v4 as uuid } from 'uuid';
import { getUniqueValue } from '@vntgcorp/vntg-wdk-client';
import { useRecoilValue } from 'recoil';

type MasterGridProps = {
  originRows: Array<any>;
  onSelectData: (value) => void;
  onGetMaxEduSchedule: (value) => void;
  onGetEmpInfo: (value) => void;
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

const MasterGrid = React.forwardRef<GridForwardFunc, MasterGridProps>(
  ({ originRows, onSelectData, onGetMaxEduSchedule, onGetEmpInfo }, ref) => {
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
          if (name == 'edu_cmplt_yn@@Y' || name == 'edu_absence_yn@@Y') {
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
    const userInfo = useRecoilValue(userInfoGlobalState);

    React.useEffect(() => {
      masterGrid.current = new ESGrid('EDU010E01GRID');
      masterGrid.current.initializeGrid(GridConfig, originRows);
      // masterGrid.current.setBoolColumn('edu_cmplt_yn', 'N', false);
      // masterGrid.current.setBoolColumn('edu_absence_yn', 'N', false);

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
          const todayString = getDate(new Date().toString());

          const emp_no = userInfo.emp_no;
          const empInfo = onGetEmpInfo(emp_no);
          const maxEduScheduleNo = onGetMaxEduSchedule('N');

          masterGrid.current.insertRow({
            edu_plan_no: getUniqueValue(),
            // To Do : 교육일정번호 마감여부가 N 인 것 중 Max값 가져오기
            // edu_schedule_no: onGetMaxEduSchedule(),
            edu_schedule_no: null,
            // To Do : 교육일정번호 마감여부가 N 인 것 중 Max값 가져오기
            edu_year: thisYear,

            //사원명 가져오기
            edu_name: null,
            emp_no: emp_no,
            edu_from_dt: todayString,
            edu_to_dt: todayString,
            edu_time: null,
            edu_type: null,
            edu_large_class: null,
            edu_middle_class: null,
            edu_supervision: null,
            edu_location: null,
            edu_rate: 0,
            edu_cmplt_yn: 'N',
            edu_absence_yn: 'N',
            edu_absence_reason: null,
            edu_attach_id: null,
            rmk: null,
            dept_code: null,
            edu_cost: null,
            close_yn: 'N',
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
        <GridHeader title={'교육계획/실적 목록'} type="default" gridBtnEvent={gridBtnEvent} />
        <div className="realGrid" id="EDU010E01GRID"></div>
      </div>
    );
  },
);

export default MasterGrid;

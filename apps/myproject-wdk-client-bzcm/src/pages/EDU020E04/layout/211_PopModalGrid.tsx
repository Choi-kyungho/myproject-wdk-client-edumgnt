import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Config } from "./211_PopModalGridConfig";
import { ESGrid } from "@vntgcorp/vntg-wdk-client";
import { DetailGridRowDataType } from "./Types";

type ModalGridProps = {
  originRows?: DetailGridRowDataType[];
  onSelectRow?: (data: DetailGridRowDataType | DetailGridRowDataType[]) => void;
  ref?: React.ReactNode;
  propsEvn:(el)=> void;
};

let modalGrid: ESGrid;
const ModalGrid: React.FC<ModalGridProps> = forwardRef(
  ({ originRows, onSelectRow, propsEvn }, ref) => {
    useImperativeHandle(ref, () => ({
      cleanup() {
        modalGrid.clearnRow();
      },
      confirm() {
      },
    }));

    useEffect(() => {
      modalGrid = new ESGrid("modalgrid");
      return () => {
        modalGrid.destroy();
      };
    }, []);

    useEffect(() => {
      if (modalGrid) {
        modalGrid.initializeGrid(Config, originRows);
        modalGrid.setLookup("user_level", "AA03");
        modalGrid.setBoolColumn("use_yn");
        const gridControlOptions = {
          editable: false,
          updatable: false,
          insertable: false,
          appendable: false,
          deletable: false,
          softDeleting: false,
        };
        modalGrid.setGridOptions(gridControlOptions);
        //modalGrid.setMultiSelectRows(true);
        /**
         * 선택-onCellDblClicked
         */
        
        modalGrid.getGridView().onCellClicked = function (
          grid,
          clickData: { [x: string]: string }
        ) {
          const row = clickData["dataRow"];
          if (typeof row != "number") return;
          if (row > -1) {
            const rowInfo = grid.getCurrent();
            console.log("DBCLICK: "+JSON.stringify(rowInfo));
            const rowVal: DetailGridRowDataType = grid
              .getDataSource()
              .getJsonRow(rowInfo.dataRow, true);
            onSelectRow(rowVal);
            propsEvn(rowVal);
          }
        };
      }
    }, [modalGrid]);

    useEffect(() => {
      modalGrid.setRows(originRows);
    }, [originRows]);

    return (
      <div
        style={{ position: "relative", maxWidth: "2000px", height: "700px" }}
        className="searchProgramManager"
      >
        {/* Real Grid */}
        <div
          style={{ width: "100%", maxWidth: "2000px", height: "700px" }}
          id="modalgrid"
        ></div>
      </div>
    );
  }
);

export default ModalGrid;

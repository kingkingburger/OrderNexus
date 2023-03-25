import React from "react";
import {
  ColumnChooser,
  DataGrid,
  Editing,
  GroupPanel,
} from "devextreme-react/data-grid";

const row = [
  {
    non: "555",
    q: "5",
    w: "3",
    e: "5",
    r: "6",
  },
  {
    non: "배배",
    q: "11",
    w: "333",
    e: "52355",
    r: "253256",
  },
];

const column = [
  {
    caption: "테스트1",
    dataField: "non",
  },
  {
    caption: "테스트2",
    dataField: "q",
  },
  {
    caption: "테스트3",
    dataField: "w",
  },
  {
    caption: "테스트4",
    dataField: "e",
  },
  {
    caption: "테스트5",
    dataField: "r",
  },
];

const Test2 = () => {
  return (
    <div>
      <DataGrid dataSource={row} columns={column}>
        <GroupPanel
          allowColumnDragging={true}
          visible={true}
          emptyPanelText={"여기에 그룹을 넣어주세요"}
        ></GroupPanel>
        <Editing></Editing>
        <ColumnChooser enabled={true} mode={"select"}></ColumnChooser>
      </DataGrid>
    </div>
  );
};

export default Test2;

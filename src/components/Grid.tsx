"use client";

import useToolbar from "@/hooks/useToolbar";
import { useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Grid = () => {
  const [width, setWidth] = useState(0);
  const { readonly, layoutList, componentList } = useToolbar();

  return (
    <div
      ref={(el) => {
        setWidth(el?.clientWidth ?? 0);
      }}
    >
      <ReactGridLayout
        cols={12}
        rowHeight={30}
        layout={layoutList?.data}
        width={width}
        className="select-none"
        isResizable={!readonly}
        isDraggable={!readonly}
      >
        {layoutList?.data?.map((item) => <div key={item.i}>{item.i}</div>)}
      </ReactGridLayout>
    </div>
  );
};

export default Grid;

"use client";

import useToolbar from "@/hooks/useToolbar";
import { useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const layout: ReactGridLayout.Layout[] = [
  {
    i: "1",
    w: 2,
    h: 2,
    x: 0,
    y: 0,
  },
  {
    i: "2",
    w: 2,
    h: 2,
    x: 2,
    y: 0,
  },
];

const Grid = () => {
  const [width, setWidth] = useState(0);
  const { readonly } = useToolbar();

  return (
    <div
      ref={(el) => {
        setWidth(el?.clientWidth || 0);
      }}
    >
      <ReactGridLayout
        cols={12}
        rowHeight={30}
        layout={layout}
        width={width}
        className="select-none"
        isResizable={!readonly}
        isDraggable={!readonly}
      >
        {layout.map((item) => (
          <div key={item.i}>{item.i}</div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Grid;

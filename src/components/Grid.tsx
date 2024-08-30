"use client";

import useToolbar from "@/hooks/useToolbar";
import { api } from "@/trpc/react";
import { useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridItem from "./GridItem";
import GridLoading from "./GridLoading";
import { TriangleRight } from "lucide-react";

const Grid = () => {
  const [width, setWidth] = useState(0);
  const { readonly, layoutList } = useToolbar();

  const resizeLayoutMutation = api.layout.resize.useMutation();
  const reorderLayoutMutation = api.layout.reorder.useMutation();

  if (layoutList?.isLoading) {
    return <GridLoading></GridLoading>;
  }

  return (
    <div
      className="relative"
      ref={(el) => {
        setWidth(el?.clientWidth ?? 0);
      }}
    >
      <ReactGridLayout
        cols={12}
        rowHeight={30}
        layout={layoutList?.data}
        compactType={"horizontal"}
        width={width}
        className="select-none"
        isResizable={!readonly}
        isDraggable={!readonly}
        onResizeStop={(layouts) => {
          const diffList = layouts.filter((item) => {
            const find = layoutList?.data?.find((item) => item.i === item.i);
            if (find) {
              return item.w !== find.w || item.h !== find.h;
            }
            return false;
          });
          diffList.forEach((item) => {
            resizeLayoutMutation.mutate({
              i: item.i,
              w: item.w,
              h: item.h,
            });
          });
        }}
        onDragStop={(layouts) => {
          const diffList = layouts.filter((item) => {
            const find = layoutList?.data?.find((item) => item.i === item.i);
            if (find) {
              return item.x !== find.x || item.y !== find.y;
            }
            return false;
          });
          diffList.forEach((item) => {
            reorderLayoutMutation.mutate({
              i: item.i,
              x: item.x,
              y: item.y,
            });
          });
        }}
        draggableHandle=".grid-item-drag"
        resizeHandle={
          !readonly ? (
            <div className="z-1 absolute bottom-0.5 right-0.5">
              <TriangleRight className="size-4 cursor-nwse-resize text-primary" />
            </div>
          ) : (
            <></>
          )
        }
      >
        {layoutList?.data?.map((item) => {
          return (
            <div
              key={item.i}
              className="overflow-hidden rounded border hover:bg-gray-900"
            >
              <GridItem item={item} />
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
};

export default Grid;

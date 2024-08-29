import { ToolbarContext } from "@/components/ToolbarContext";
import React, { useContext } from "react";

const useToolbar = () => {
  const toolbarContext = useContext(ToolbarContext);
  return {
    ...toolbarContext,
  };
};

export default useToolbar;

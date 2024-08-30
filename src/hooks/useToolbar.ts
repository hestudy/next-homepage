import { ToolbarContext } from "@/components/ToolbarContext";
import { useContext } from "react";

const useToolbar = () => {
  const toolbarContext = useContext(ToolbarContext);
  return {
    ...toolbarContext,
  };
};

export default useToolbar;

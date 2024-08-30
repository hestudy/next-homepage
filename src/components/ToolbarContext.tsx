"use client";

import { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;

export const ToolbarContext = createContext<{
  readonly?: boolean;
  setReadOnly?: (readonly?: boolean) => void;
  componentList?: ReturnType<
    typeof api.component.list.useQuery<RouterOutput["component"]["list"]>
  >;
  noLayoutComponentList?: ReturnType<
    typeof api.component.list.useQuery<RouterOutput["component"]["list"]>
  >;
  layoutList?: ReturnType<
    typeof api.layout.list.useQuery<RouterOutput["layout"]["list"]>
  >;
}>({});

export const ToolbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [readonly, setReadOnly] = useState(true);
  const noLayoutComponentList = api.component.list.useQuery({
    filterNoLayout: true,
  });
  const componentList = api.component.list.useQuery();
  const layoutList = api.layout.list.useQuery();

  return (
    <ToolbarContext.Provider
      value={{
        readonly,
        setReadOnly: (value) => {
          setReadOnly(!!value);
        },
        noLayoutComponentList,
        componentList,
        layoutList,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

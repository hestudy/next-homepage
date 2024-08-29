"use client";

import { createContext, useState } from "react";

export const ToolbarContext = createContext<{
  readonly?: boolean;
  setReadOnly?: (readonly?: boolean) => void;
}>({});

export const ToolbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [readonly, setReadOnly] = useState(true);

  return (
    <ToolbarContext.Provider
      value={{
        readonly,
        setReadOnly: (value) => {
          setReadOnly(!!value);
        },
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

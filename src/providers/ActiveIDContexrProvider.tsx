import React from "react";
import { useActiveId } from "../lib/hooks.js";

type ActiveIDContextProviderProps = {
  children: React.ReactNode;
};

type ActiveIDContext = {
  activeId: number | null;
};

export const ActiveIDContext = React.createContext<ActiveIDContext | null>(
  null
);

export default function ActiveIDContextProvider({
  children,
}: ActiveIDContextProviderProps) {
  const activeId = useActiveId();

  return (
    <ActiveIDContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIDContext.Provider>
  );
}

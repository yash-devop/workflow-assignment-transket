import React, { createContext, useContext } from "react";

type TContext = {
  // context types
};

const Context = createContext<TContext | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // statements.

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useContextHook = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("message");
  }
  return context;
};

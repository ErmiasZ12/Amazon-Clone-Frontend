
import React, { createContext, useReducer } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const stateAndDispatch = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={stateAndDispatch}>
      {children}
    </DataContext.Provider>
  );
};

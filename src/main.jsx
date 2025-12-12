import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./Components/DataProvider/DataProvider";
import { initialState, reducer } from "./Utility/reducer";

// import React, { createContext, useReducer } from "react";

// export const DataContext = createContext();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
       <App />
    </DataProvider>
  </StrictMode>
);

// export const DataProvider = ({ children, reducer, initialState }) => {
//   const stateAndDispatch = useReducer(reducer, initialState);

//   return (
//     <DataContext.Provider value={stateAndDispatch}>
//       {children}
//     </DataContext.Provider>
//   );
// };

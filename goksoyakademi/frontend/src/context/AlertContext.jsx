// import { createContext, useContext, useState } from "react";

// const AlertContext = createContext(undefined);

// export const AlertProvider = ({ children }) => {
//   const [state, setState] = useState({
//     isOpen: false,
//     // Type can be either "success" or "error"
//     type: "success",
//     // Message to be displayed, can be any string
//     message: "",
//   });

//   return (
//     <AlertContext.Provider
//       value={{
//         ...state,
//         onOpen: (type, message) => setState({ isOpen: true, type, message }),
//         onClose: () => setState({ isOpen: false, type: "", message: "" }),
//       }}
//     >
//       {children}
//     </AlertContext.Provider>
//   );
// };

// export const useAlertContext = () => useContext(AlertContext);




import React, { createContext, useContext, useState } from "react";

const initialState = {
  isOpen: false,
  type: "success",
  message: "",
  onOpen: () => {},
  onClose: () => {},
};

const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const onOpen = (type, message) => setState({ isOpen: true, type, message });
  const onClose = () => setState({ isOpen: false, type: "", message: "" });

  return (
    <AlertContext.Provider value={{ ...state, onOpen, onClose }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};


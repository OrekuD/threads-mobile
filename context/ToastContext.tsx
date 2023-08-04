import React from "react";
import { ToastContextType } from "@/types";

const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {},
});

const ToastContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ToastContext.Provider value={{ showToast: () => {} }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;

import React from "react";
import { CameraContextType } from "@/types";

const CameraContext = React.createContext<CameraContextType>({
  hasCameraPermission: false,
  setHasCameraPermission: () => {},
});

const CameraContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [hasCameraPermission, setHasCameraPermission] =
    React.useState<boolean>(false);

  return (
    <CameraContext.Provider
      value={{ hasCameraPermission, setHasCameraPermission }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export default CameraContextProvider;

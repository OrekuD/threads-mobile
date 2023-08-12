import React from "react";
import { AuthContextType } from "@/types";

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

const AuthContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated: setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);

export default AuthContextProvider;

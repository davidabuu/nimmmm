import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
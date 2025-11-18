import React, { createContext } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthDataContext = createContext();

export default function AuthContext({ children }) {
  let serverUrl = "http://localhost:8000";

  let value = {
    serverUrl,
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

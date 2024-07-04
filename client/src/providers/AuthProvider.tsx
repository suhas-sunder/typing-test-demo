import React, { createContext, useState } from "react";

interface ContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userId: string;
  setUserId: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userId: "",
  setUserId: () => {},
  userName: "",
  setUserName: () => {},
  email: "",
  setEmail: () => {}
});

interface PropType {
  children: React.ReactNode;
}

function AuthProvider({ children }: PropType) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
        userName,
        setUserName,
        email,
        setEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

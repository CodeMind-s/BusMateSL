import React, { createContext, useState, ReactNode } from "react";

// Define the types for the context state and actions
interface AuthContextType {
  id: string | undefined;              // Keep this as is
  setId: (id: string | undefined) => void; // Allow undefined
  name: string | undefined;            // Keep this as is
  setName: (name: string | undefined) => void; // Allow undefined
  userEmail: string | undefined;       // Keep this as is
  setUserEmail: (email: string | undefined) => void; // Allow undefined
  token: string | undefined;            // Keep this as is
  setToken: (token: string | undefined) => void; // Allow undefined
}


// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [token, setToken] = useState<string>();

  return (
    <AuthContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        userEmail,
        setUserEmail,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

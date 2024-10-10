import React, { createContext, useState, ReactNode } from "react";

// Define the types for the context state and actions
interface TicketContextType {
  date: string | undefined;
  setDate: (date: string) => void;
  gender: "Male" | "Female" | undefined;
  setGender: (gender: "Male" | "Female") => void;
}

// Create the context with a default value
export const TicketContext = createContext<TicketContextType | undefined>(
  undefined
);

// Define the provider props type
interface TicketProviderProps {
  children: ReactNode;
}

// Create the provider component
export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [date, setDate] = useState<string>();
  const [gender, setGender] = useState<"Male" | "Female">();

  return (
    <TicketContext.Provider value={{ date, setDate, gender, setGender }}>
      {children}
    </TicketContext.Provider>
  );
};

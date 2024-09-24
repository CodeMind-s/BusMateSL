import { createContext, useState, ReactNode } from 'react';

export const SearchContext = createContext({
  isSearchActive: false,
  setIsSearchActive: (value: boolean) => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchActive, setIsSearchActive }}>
      {children}
    </SearchContext.Provider>
  );
};
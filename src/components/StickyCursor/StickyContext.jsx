import { createContext, useContext, useRef } from "react";

const StickyContext = createContext();

export const StickyProvider = ({ children }) => {
  const stickyElementsRef = useRef([]);

  const addStickyElement = (element) => {
    stickyElementsRef.current.push(element);
  };

  return (
    <StickyContext.Provider value={{ addStickyElement, stickyElementsRef }}>
      {children}
    </StickyContext.Provider>
  );
};

export const useStickyContext = () => {
  const context = useContext(StickyContext);
  if (!context) {
    throw new Error("useStickyContext must be used within a StickyProvider");
  }
  return context;
};

import React, {createContext, useState} from "react";

export const LandingContext = createContext();

export const LandingProvider = ({children}) => {
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <LandingContext.Provider value={{isChatVisible, toggleChat}}>
      {children}
    </LandingContext.Provider>
  );
};

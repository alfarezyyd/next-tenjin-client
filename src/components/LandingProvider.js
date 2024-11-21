import React, {createContext, useState} from "react";

export const LandingContext = createContext();

export const LandingProvider = ({children}) => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatData, setChatData] = useState([]);
  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <LandingContext.Provider value={{isChatVisible, toggleChat, chatData, setChatData}}>
      {children}
    </LandingContext.Provider>
  );
};

import React, {createContext, useState} from "react";

export const LandingContext = createContext();

export const LandingProvider = ({children}) => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatData, setChatData] = useState([]);
  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };
  const [activeChat, setActiveChat] = useState(null);
  return (
    <LandingContext.Provider value={{isChatVisible, toggleChat, chatData, setChatData, activeChat, setActiveChat}}>
      {children}
    </LandingContext.Provider>
  );
};

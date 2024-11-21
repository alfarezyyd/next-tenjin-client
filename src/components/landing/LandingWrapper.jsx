import Footer from "./Footer";
import Navbar from "./Navbar";
import {Divider, Image, NextUIProvider} from "@nextui-org/react";
import Insta from "@/components/landing/Insta";
import {ToastContainer} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import {IoChatbubblesOutline} from "react-icons/io5";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";
import {LandingContext, LandingProvider} from "@/components/LandingProvider";
import {initializeSocket} from "@/components/chat/socket";

export default function LandingWrapper({children}) {
  const [accessToken, setAccessToken] = useState();
  const [decodedAccessToken, setDecodedAccessToken] = useState();
  const {isChatVisible, toggleChat, chatData, setChatData} = useContext(LandingContext);
  const [socket, setSocket] = useState();
  const [activeChat, setActiveChat] = useState();
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (decodedAccessToken) {
      setSocket(initializeSocket(decodedAccessToken.email, decodedAccessToken.uniqueId));
    }
  }, [decodedAccessToken])

  useEffect(() => {
    if (socket && decodedAccessToken) {
      socket.on("onlineUsers", (onlineUser) => {
        console.log("onlineUser", onlineUser);
        setChatData((prevChatData) => {
          const updatedChatData = [...prevChatData]; // Salin data lama

          onlineUser.forEach((onlineUserElement) => {
            // Hindari duplikasi dan tambahkan hanya jika berbeda
            if (onlineUserElement.userUniqueId !== decodedAccessToken.uniqueId && !updatedChatData.some((chat) => chat.uniqueId !== onlineUserElement.userUniqueId)) {
              updatedChatData.push({
                name: onlineUserElement.name,
                uniqueId: onlineUserElement.userUniqueId,
                userId: onlineUserElement.userId,
                messages: onlineUserElement.messages,
              });
            }
          });

          return updatedChatData; // Kembalikan array yang diperbarui
        });
      });
    }
  }, [socket, decodedAccessToken]);

  useEffect(() => {
    console.log(chatData)
  }, [chatData]);

  const triggerSendMessage = async () => {
    console.log(message)
    if (socket) {
      socket.emit("privateMessage", message);
    }
  };

  async function handleActiveChat(chatData) {
    console.log(chatData);
    setActiveChat({
      name: chatData.name,
      messages: chatData.messages,
      destinationUserUniqueId: chatData.uniqueId,
      userId: chatData.userId
    })
  }


  return (<LandingProvider>

    <NextUIProvider>
      <ToastContainer/>
      <Navbar/>
      <main>
        {children}
        {accessToken && (<div className="relative z-50">
          <button
            className="fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 bg-black text-white hover:bg-gray-700 rounded-full shadow-lg border border-gray-200"
            type="button"
            aria-haspopup="dialog"
            onClick={toggleChat}
            aria-expanded={isChatVisible ? "true" : "false"}
          >
            <IoChatbubblesOutline className={"text-3xl"}/>
          </button>

          <div
            className={`fixed h-[90%] bottom-20 right-4 bg-white p-6 rounded-lg border border-gray-200 w-full max-w-lg sm:max-w-2xl transition-transform duration-300 ease-in-out ${isChatVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
            style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}
          >
            {/* Chat Window */}
            <div className="flex flex-col lg:flex-row h-full">
              <div className="bg-gray-50 w-full lg:w-5/12 p-4 rounded-lg shadow-sm -m-6 mr-6">
                <header className="mb-2 flex flex-row flex-wrap">
                  <div className="flex items-center space-x-3">
                    <Image
                      className="w-12 h-12 rounded-full object-cover shrink-0 min-w-[48px] min-h-[48px]"
                      src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                      alt="Lauren Marsano"
                    />
                    <div className="">
                      <h2 className="text-lg font-bold text-gray-800">{decodedAccessToken?.name}</h2>
                      <p className="text-sm text-gray-500 break-words max-w-40">{decodedAccessToken?.email}</p>
                    </div>
                  </div>
                  <Divider orientation={"horizontal"} className={"w-full mt-2"}/>
                </header>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Chats</h3>
                  {chatData?.length > 0 && chatData.map((chat) => {
                    return (<button key={chat.userUniqueId} onClick={() => {
                      handleActiveChat(chat)
                    }}
                                    className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition">
                      <Image
                        className="w-8 h-8 rounded-full mr-3"
                        src={`https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg`}
                        alt={chat.name}
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{activeChat?.name}</h4>
                        <p className="text-xs text-gray-500">Last chat · 2hrs ago</p>
                      </div>
                    </button>)
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-between w-full lg:w-7/12 p-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Chatbot</h2>
                  <p className="text-sm text-gray-500">Powered by Mendable and Vercel</p>
                </div>
                <div className="mt-6 space-y-4 overflow-y-auto flex-grow">
                  {activeChat?.messages?.length > 0 && activeChat.messages.map((chat, index) => {
                    return (chat.isSender ? (<div className="flex items-start gap-2.5 justify-end" key={index}>
                      <div
                        className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-br-xl dark:bg-gray-700 text-right">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                              <span
                                className="text-sm font-semibold text-gray-900 dark:text-white">{activeChat.name}</span>
                          <span className="text-sm font-semibold text-black">-</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {chat.message}
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                      </div>
                      <Image className="w-9 h-8 rounded-full"
                             src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                             alt="Jese image"/>
                    </div>) : (<div className="flex items-start gap-2.5" key={index}>
                      <Image className="w-9 h-8 rounded-full"
                             src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                             alt="Jese image"/>
                      <div
                        className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span
                                className="text-sm font-semibold text-gray-900 dark:text-white">{activeChat.name}</span>
                          <span className="text-sm font-semibold text-black">-</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {chat.message}
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                      </div>
                    </div>))
                  })}
                </div>
                <form className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    placeholder="Type your message"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                  <button onClick={triggerSendMessage} type="button"
                          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>)}
        <Insta/>
      </main>
      <Footer/>
    </NextUIProvider>
  </LandingProvider>);
}

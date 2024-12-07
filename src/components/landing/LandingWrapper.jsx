import Footer from "./Footer";
import Navbar from "./Navbar";
import {Divider, Image, Input, NextUIProvider} from "@nextui-org/react";
import {useContext, useEffect, useRef, useState} from "react";
import {IoChatbubblesOutline} from "react-icons/io5";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";
import {LandingContext, LandingProvider} from "@/components/LandingProvider";
import {initializeSocket} from "@/components/chat/socket";
import '@/app/globals.css'

export default function LandingWrapper({children}) {
  const [accessToken, setAccessToken] = useState();
  const [decodedAccessToken, setDecodedAccessToken] = useState();
  const {isChatVisible, toggleChat, chatData, setChatData, activeChat, setActiveChat} = useContext(LandingContext);
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState("");
  const activeChatRef = useRef(); // Ref untuk menyimpan activeChat
  const lastMessageRef = useRef(null);

  useEffect(() => {
    activeChatRef.current = activeChat; // Update ref setiap activeChat berubah
  }, [activeChat]);

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
      socket.on("allRelatedUsers", (relatedUser) => {
        setChatData((prevChatData) => {
          const updatedChatData = {...prevChatData}; // Salin data lama (spread operator untuk objek)
          relatedUser.forEach((relatedUserElement) => {
            // Hindari duplikasi dan tambahkan hanya jika berbeda
            if (relatedUserElement.userUniqueId !== decodedAccessToken.uniqueId && !updatedChatData[relatedUserElement.userUniqueId]) {
              updatedChatData[relatedUserElement.userUniqueId] = {
                name: relatedUserElement.name,
                uniqueId: relatedUserElement.userUniqueId,
                userId: relatedUserElement.userId,
                messages: relatedUserElement.messages,
              };
            }
          });
          return updatedChatData; // Kembalikan array yang diperbarui
        });
      });
    }
  }, [socket, decodedAccessToken]);
  useEffect(() => {
  }, [activeChat])

  useEffect(() => {
    if (socket) {
      socket.on("privateMessage", (message) => {
        if (message.message.isSender) {
          setActiveChat({
            ...activeChatRef.current, messages: [...(activeChatRef.current?.messages ?? []), {
              isSender: message.message.isSender,
              message: message.message.message,
              timestamp: message.message.timestamp,
              status: message.message.status,
            }]
          })
        }
        // Update chatData secara dinamis
        setChatData((prevChatData) => {
          const updatedChatData = {...prevChatData};
          console.log(message)
          if (message.message.isSender) {
            if (updatedChatData[message.destinationUserUniqueId]) {
              updatedChatData[message.destinationUserUniqueId].messages = [...(updatedChatData[message.destinationUserUniqueId].messages || []), {
                isSender: message.message.isSender,
                message: message.message.message,
                timestamp: message.message.timestamp,
                status: message.message.status,
              },];
            } else {
              updatedChatData[message.destinationUserUniqueId] = {
                name: message.originUserName,
                uniqueId: message.destinationUserUniqueId,
                userId: message.userId,
                messages: [{
                  isSender: message.message.isSender,
                  message: message.message.message,
                  timestamp: message.message.timestamp,
                  status: message.message.status,
                },],
              };
            }
          } else {
            if (updatedChatData[message.originUserUniqueId]) {
              updatedChatData[message.originUserUniqueId].messages = [...(updatedChatData[message.originUserUniqueId].messages || []), {
                isSender: message.message.isSender,
                message: message.message.message,
                timestamp: message.message.timestamp,
                status: message.message.status,
              },];
            } else {
              updatedChatData[message.originUserUniqueId] = {
                name: message.originUserName, uniqueId: message.originUserUniqueId, userId: message.userId, messages: [{
                  isSender: message.message.isSender,
                  message: message.message.message,
                  timestamp: message.message.timestamp,
                  status: message.message.status,
                },],
              };
            }
          }

          return {...updatedChatData}; // Ganti referensi utama
        });
      });

      // Cleanup listener saat komponen unmount
      return () => socket.off("privateMessage");
    }
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [activeChat?.messages, isChatVisible]); // Tambahkan dependensi


  useEffect(() => {
    if (chatData && Object.keys(chatData).length > 0 && !activeChat) {
      const defaultMentor = Object.values(chatData).find(chat => chat.uniqueId === activeChat?.uniqueId);

      if (defaultMentor) {
        setActiveChat({
          name: defaultMentor.name,
          messages: defaultMentor.messages,
          destinationUserUniqueId: defaultMentor.uniqueId,
          userId: defaultMentor.userId
        });
      }
    }
  }, [chatData, activeChat]);


  const triggerSendMessage = async () => {
    if (socket) {
      socket.emit("privateMessage", {
        "type": "privateMessage", "message": message, "destinationUserUniqueId": activeChat.destinationUserUniqueId
      });
      setMessage("")
    }
  };

  async function handleActiveChat(chatData) {
    setActiveChat({
      name: chatData.name,
      messages: chatData.messages,
      destinationUserUniqueId: chatData.uniqueId,
      userId: chatData.userId
    })
  }


  return (<LandingProvider>
    <NextUIProvider>
      <Navbar/>
      <main>
        {children}
        {accessToken && !CommonUtil.isTokenExpired(accessToken) && (<div className="relative z-50">
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
                  {chatData && Object.values(chatData).length > 0 && Object.values(chatData).map((chat) => {

                    return (<button key={chat.uniqueId} onClick={() => {
                      handleActiveChat(chat)
                    }}
                                    className={`w-full flex items-center p-2 rounded-md hover:bg-sky-500 transition group ${chat.uniqueId === activeChat?.destinationUserUniqueId ? 'bg-sky-200' : 'bg-gray-100'}`}>
                      <Image
                        className="w-8 h-8 rounded-full mr-3"
                        src={`https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg`}
                        alt={chat.name}
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-white">{chat.name}</h4>
                        {chat.messages !== undefined && chat.messages.length > 0 && (<p
                            className="text-xs text-gray-500 text-left group-hover:text-white">{chat.messages[chat.messages.length - 1].message} ·
                            {CommonUtil.diffForHumans(chat.messages[chat.messages.length - 1].timestamp)}</p>)}
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
                    const isLastMessage = index === activeChat.messages.length - 1; // Cek apakah ini pesan terakhir
                    return chat.isSender ? (<div
                      className="flex items-start gap-2.5 justify-end"
                      key={index}
                      ref={isLastMessage ? lastMessageRef : null} // Tambahkan ref ke pesan terakhir
                    >
                      <div
                        className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-br-xl dark:bg-gray-700 text-right">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {decodedAccessToken?.name}

              </span>
                          <span className="text-sm font-semibold text-black">-</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {chat.timestamp.substring(11, 16)}
              </span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {chat.message}
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {chat.status}
            </span>
                      </div>
                      <Image
                        className="w-9 h-8 rounded-full"
                        src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                        alt="Jese image"
                      />
                    </div>) : (<div
                      className="flex items-start gap-2.5"
                      key={index}
                      ref={isLastMessage ? lastMessageRef : null} // Tambahkan ref ke pesan terakhir
                    >
                      <Image
                        className="w-9 h-8 rounded-full"
                        src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                        alt="Jese image"
                      />
                      <div
                        className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {activeChat.name}
              </span>
                          <span className="text-sm font-semibold text-black">-</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:46
              </span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                          {chat.message}
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {chat.status}
            </span>
                      </div>
                    </div>);
                  })}
                </div>
                <form className="flex items-center space-x-2 mt-4">
                  <Input
                    type="text"
                    value={message}
                    placeholder="Type your message"
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                  />
                  <button onClick={triggerSendMessage} type="button"
                          disabled={activeChat?.destinationUserUniqueId === undefined}
                          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>)}
      </main>
      <Footer/>
    </NextUIProvider>
  </LandingProvider>);
}

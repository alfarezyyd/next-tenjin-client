import Footer from "./Footer";
import Navbar from "./Navbar";
import {Image, NextUIProvider} from "@nextui-org/react";
import Insta from "@/components/landing/Insta";
import {ToastContainer} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import socket from "@/components/chat/socket";
import {IoChatbubblesOutline} from "react-icons/io5";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";
import {LandingContext, LandingProvider} from "@/components/LandingProvider";

export default function LandingWrapper({children}) {
  const [accessToken, setAccessToken] = useState();
  const [decodedAccessToken, setDecodedAccessToken] = useState();
  const {isChatVisible, toggleChat} = useContext(LandingContext);
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt[accessToken]);
    }
  }, [accessToken]);

  const triggerSendMessage = async () => {
    socket.emit("privateMessage", {
      type: "privateMessage",
      message: "Hello, how are you?",
      destinationUserUniqueId: "ed29d577-00dc-4a75-bf5c-2bf56e353694",
    });
  };

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
                <header className="mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      className="w-12 h-12 rounded-full"
                      src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                      alt="Lauren Marsano"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Lauren Marsano</h2>
                      <p className="text-sm text-gray-500">@lauren.mars</p>
                    </div>
                  </div>
                </header>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Chats</h3>
                  {["Marie Zulfikar", "Scott Micheal"].map((name, index) => (<button key={index}
                                                                                     className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition">
                    <Image
                      className="w-8 h-8 rounded-full mr-3"
                      src={`https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-0${index + 1}_pfck4u.jpg`}
                      alt={name}
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
                      <p className="text-xs text-gray-500">Last chat · 2hrs ago</p>
                    </div>
                  </button>))}
                </div>
              </div>
              <div className="flex flex-col justify-between w-full lg:w-7/12 p-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Chatbot</h2>
                  <p className="text-sm text-gray-500">Powered by Mendable and Vercel</p>
                </div>
                <div className="mt-6 space-y-4 overflow-y-auto flex-grow">
                  <div className="flex items-start gap-2.5">
                    <Image className="w-10 h-8 rounded-full"
                           src={`https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-0${1}_pfck4u.jpg`}
                           alt="Jese image"/>
                    <div
                      className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">Thats awesome. I think
                        our users will really appreciate the improvements.</p>
                    </div>
                  </div>
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

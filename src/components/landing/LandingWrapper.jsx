"use client"
import Footer from "./Footer";
import Navbar from "./Navbar";
import '../../app/globals.css'
import {Image, NextUIProvider} from "@nextui-org/react";
import Insta from "@/components/landing/Insta";
import {ToastContainer} from "react-toastify";
import {useState} from "react";

export default function LandingWrapper({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  return (<NextUIProvider>
      <ToastContainer/>
      <Navbar/>
      <main>
        {children}
        <div className="relative z-50">
          <button
            onClick={toggleChatbot}
            className="fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 bg-black text-white hover:bg-gray-700 rounded-full shadow-lg border border-gray-200"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
            </svg>
          </button>

          <div
            className={`fixed h-[90%] bottom-20 right-4 bg-white p-6 rounded-lg border border-gray-200 w-full max-w-lg sm:max-w-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
            style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Sidebar */}
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
                  {["Marie Zulfikar", "Scott Micheal"].map((name, index) => (<button
                    key={index}
                    className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition"
                  >
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

              {/* Main Chat Area */}
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
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                      </div>
                      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think
                        our
                        users will really appreciate the improvements.</p>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                    <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                            data-dropdown-placement="bottom-start"
                            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                            type="button">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path
                          d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <form className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    placeholder="Type your message"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Insta/>
      </main>
      <Footer/>
    </NextUIProvider>
  )
}
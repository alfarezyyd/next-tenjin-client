import Footer from "./Footer";
import Navbar from "./Navbar";
import '../../app/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import Insta from "@/components/landing/Insta";
import {ToastContainer} from "react-toastify";

export default function LandingWrapper({children}) {
  return (
    <NextUIProvider>
      <ToastContainer/>
      <Navbar/>
      <main>
        {children}
        <Insta/>
      </main>
      <Footer/>
    </NextUIProvider>
  )
}
import Footer from "./Footer";
import Navbar from "./Navbar";
import '../../app/globals.css'
import {NextUIProvider} from "@nextui-org/react";

export default function LandingWrapper({children}) {
  return (
    <>
      <Navbar/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}
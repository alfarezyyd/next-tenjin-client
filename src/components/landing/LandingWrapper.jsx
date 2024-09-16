import Footer from "./Footer";
import Navbar from "./Navbar";
import '../../app/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import Insta from "@/components/landing/Insta";

export default function LandingWrapper({children}) {
  return (
    <NextUIProvider>
      <Navbar/>
      <main>
        {children}
        <Insta/>
      </main>
      <Footer/>
    </NextUIProvider>
  )
}
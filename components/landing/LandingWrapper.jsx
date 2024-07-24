import Footer from "./Footer";
import Navbar from "./Navbar";
import '../../src/app/globals.css'

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
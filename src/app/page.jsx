import Navbar from '/src/components/landing/Navbar/index';
import Footer from '/src/components/landing/Footer/index';
import Banner from '/src/components/landing/Banner/index';
import Aboutus from '/src/components/landing/Aboutus/index';
import Dedicated from '/src/components/landing/Dedicated/index';
import Digital from '/src/components/landing/Digital/index';
import Beliefs from '/src/components/landing/Beliefs/index';
import Wework from '/src/components/landing/Wework/index';
import FAQ from '/src/components/landing/FAQ/index';
import Testimonials from '/src/components/landing/Testimonials/index';
import Joinus from '/src/components/landing/Joinus/index';
import './globals.css'
import ErrorBoundary from "@/app/errors/ErrorBoundary";

export default function Page() {
  return (<ErrorBoundary>
    <Navbar/>
    <main>
      <Banner/>
      <Aboutus/>
      <Dedicated/>
      <Digital/>
      <Beliefs/>
      <Wework/>
      <FAQ/>
      <Testimonials/>
      <Joinus/>
    </main>
    <Footer/>
  </ErrorBoundary>)
}
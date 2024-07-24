import Navbar from '/components/landing/Navbar/index';
import Footer from '/components/landing/Footer/index';
import Banner from '/components/landing/Banner/index';
import Aboutus from '/components/landing/Aboutus/index';
import Dedicated from '/components/landing/Dedicated/index';
import Digital from '/components/landing/Digital/index';
import Beliefs from '/components/landing/Beliefs/index';
import Wework from '/components/landing/Wework/index';
import Ourteam from '/components/landing/Ourteam/index';
import Manage from '/components/landing/Manage/index';
import FAQ from '/components/landing/FAQ/index';
import Testimonials from '/components/landing/Testimonials/index';
import Articles from '/components/landing/Articles/index';
import Joinus from '/components/landing/Joinus/index';
import Insta from '/components/landing/Insta/index';
import './globals.css'

export default function Page() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <Aboutus/>
        <Dedicated/>
        <Digital/>
        <Beliefs/>
        <Wework/>
        <Ourteam/>
        <Manage/>
        <FAQ/>
        <Testimonials/>
        <Articles/>
        <Joinus/>
        <Insta/>
      </main>
      <Footer/>
    </>
  )
}
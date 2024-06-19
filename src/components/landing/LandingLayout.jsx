import "@/style/flexboxgrid.min.css";
import "@/style/index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import Footer from "@/components/landing/Sections/Footer";

export default function LandingLayout({children}) {
  const DynamicTopBar = dynamic(() => import("@/components/landing/Nav/TopNavbar"), {
    ssr: false,
  })
  return (
    <>
      <DynamicTopBar/>
      {children}
      <Footer/>
    </>
  )
}
"use client"
import dynamic from 'next/dynamic'

import React from "react";
import Header from "@/components/landing/Sections/Header";
import "@/style/flexboxgrid.min.css";
import "@/style/index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "@/components/landing/Sections/Services";
import Projects from "@/components/landing/Sections/Projects";
import Blog from "@/components/landing/Sections/Blog";
import Pricing from "@/components/landing/Sections/Pricing";
import Contact from "@/components/landing/Sections/Contact";
import Footer from "@/components/landing/Sections/Footer";
// Sections

export default function Landing() {

  const DynamicTopBar = dynamic(() => import("@/components/landing/Nav/TopNavbar"), {
    ssr: false,
  })
  return (
    <>
      <DynamicTopBar/>
      <Header/>
      <Services/>
      <Projects/>
      <Blog/>
      <Pricing/>
      <Contact/>
      <Footer/>
    </>
  );
}



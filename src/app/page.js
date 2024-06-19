"use client"
import dynamic from 'next/dynamic'

import React from "react";
import Header from "@/components/landing/Sections/Header";

import Services from "@/components/landing/Sections/Services";
import Projects from "@/components/landing/Sections/Projects";
import Blog from "@/components/landing/Sections/Blog";
import Pricing from "@/components/landing/Sections/Pricing";
import Contact from "@/components/landing/Sections/Contact";
import LandingLayout from "@/components/landing/LandingLayout";
// Sections

export default function Page() {


  return (
    <>
      <LandingLayout>
        <Header/>
        <Services/>
        <Projects/>
        <Blog/>
        <Pricing/>
        <Contact/>
      </LandingLayout>
    </>
  );
}



"use client";

import {LandingProvider} from "@/components/LandingProvider";
import {ToastContainer} from "react-toastify";

export default function Providers({children}) {
  return <LandingProvider>
    <ToastContainer style={{zIndex: 9999}}/>
    {children}
  </LandingProvider>;
}

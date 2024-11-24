"use client";

import {LandingProvider} from "@/components/LandingProvider";

export default function Providers({children}) {
  return <LandingProvider>
    {children}
  </LandingProvider>;
}

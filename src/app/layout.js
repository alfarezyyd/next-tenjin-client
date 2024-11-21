"use client"
import './fonts.css'
import {LandingProvider} from "@/components/LandingProvider";


export default function RootLayout({children}) {
  return (<html lang="en">
  <body className="w-full m-0 p-0">
  <LandingProvider>
    {children}
  </LandingProvider>
  </body>
  </html>);
}

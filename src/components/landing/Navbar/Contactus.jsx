"use client"
import Link from 'next/link';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";


const Contactusform = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, [])
  return (
    <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0 ">
      <div className='hidden lg:block'>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${accessToken ? 'admin/dashboard' : 'auth/login'}`} passHref>
          <button type="button"
                  className='justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white'>
            {accessToken ? 'Admin' : 'Get Started'}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Contactusform;

"use client"
import {useRouter} from "next/navigation";

const Join = () => {
  const router = useRouter()
  return (
    <div className="bg-joinus my-32" id="join-us-section">
      <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>

        <div className="text-center">
          <h3 className="text-blue text-lg font-normal tracking-widest">JOIN US</h3>
          <h2 className="text-4xl sm:text-6xl font-bold my-6 leading-10"> Hubungkan Dirimu <br/> dengan Mentor Terbaik
          </h2>
          <p className="text-lightblack text-base font-normal">Tenjin mempermudah cohort dan mentor untuk terhubung,
            berbagi wawasan, <br/> dan meraih kesuksesan bersama melalui pertemuan online yang efisien.</p>
        </div>

        <div className="mx-auto max-w-4xl pt-5">
          <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full">
            <div>
              <input type="name"
                     className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black"
                     placeholder="Your name" autoComplete="off"/>
            </div>
            <div>
              <input type="email"
                     className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-lightgrey focus:outline-none bg-emailbg focus:text-black"
                     placeholder="Your email" autoComplete="off"/>
            </div>
            <div className="sm:mr-3">
              <button type="submit" onClick={(e) => {
                e.preventDefault();
                router.push('/auth/register')
              }}
                      className="joinButton w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue hover:bg-btnblue">
                Join!
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Join;

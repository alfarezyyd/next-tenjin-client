"use client"
import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import Link from 'next/link';


const Contactusform = () => {
  let [isOpen, setIsOpen] = useState(false)

  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: ''
  });


  return (
    <>
      <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0 ">
        <div className='hidden lg:block'>
          <button type="button"
                  className='justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white'>
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}

export default Contactusform;

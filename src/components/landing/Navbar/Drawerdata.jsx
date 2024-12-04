import React from "react";
import Link from "next/link";
import Contactusform from "./Contactus";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Data = ({navigation}) => {

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-200 px-3 text-purple' : 'px-3 text-black hover:bg-gray-500 hover:text-purple',
                  'block  py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <button
              className="bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded">
              Contact Us
            </button>
            {/* <Contactusform /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;

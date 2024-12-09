import {Disclosure} from '@headlessui/react';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Bars3Icon} from '@heroicons/react/24/outline';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Contactusform from './Contactus';

const navigation = [{name: 'About Us', href: '#aboutus-section', current: false}, {
  name: 'Vision', href: '#vision-section', current: false
}, {name: 'Our Mentors', href: '#our-mentors-section', current: false}, {
  name: 'Testimonial', href: '#testimonial-section', current: false
}, {name: 'Join Us', href: '#join-us-section', current: false},];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [navItems, setNavItems] = useState(navigation);
  let windowHash = null;
  if (typeof window !== 'undefined') {
    windowHash = window?.location?.hash;
  }
  const [currentHash, setCurrentHash] = useState('');
  // Use effect to check hash change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access the current URL hash
      const hash = window.location.hash;
      setCurrentHash(hash);

    }
  }, [windowHash]); // Run only on component mount

  // Update navigation items based on current hash
  useEffect(() => {
    const updatedNavItems = navItems.map((item) => ({
      ...item, current: currentHash === item.href, // Set current to true if href matches the current hash
    }));
    setNavItems(updatedNavItems); // Update the navigation state
  }, [currentHash]); // Re-run when currentHash changes

  const [isOpen, setIsOpen] = useState(false);


  return (<Disclosure as="nav" className="navbar">
    <>
      <div className="mx-auto max-w-7xl p-3 md:p-4 lg:px-8">
        <div className="relative flex h-12 sm:h-20 items-center">
          <div className="flex flex-1 items-center sm:justify-between">
            {/* LOGO */}
            <div className="flex flex-shrink-0 items-center border-right">
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
                className="text-2xl sm:text-4xl font-semibold text-black"
              >
                Tenjin
              </Link>
            </div>

            {/* LINKS */}
            <div className="hidden lg:flex items-center border-right">
              <div className="flex justify-end space-x-4">
                {navItems.map((item) => (<Link
                  key={item.name}
                  href={item.href}
                  className={classNames(item.current ? '' : 'navlinks hover:text-black', 'px-3 py-4 rounded-md text-lg font-normal')}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>))}
              </div>
            </div>
            <Contactusform/>
          </div>

          {/* DRAWER FOR MOBILE VIEW */}
          {/* DRAWER ICON */}
          <div className="block lg:hidden">
            <Bars3Icon
              className="block h-6 w-6"
              aria-hidden="true"
              onClick={() => setIsOpen(true)}
            />
          </div>

          {/* DRAWER LINKS DATA */}
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <Drawerdata navigation={navItems}/>
          </Drawer>
        </div>
      </div>
    </>
  </Disclosure>);
};

export default Navbar;

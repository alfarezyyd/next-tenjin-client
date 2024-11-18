"use client"
import LandingWrapper from "@/components/landing/LandingWrapper";
import {Image} from "@nextui-org/react"
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import {Loading} from "@/components/admin/Loading";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutItem, setCheckoutItem] = useState();
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
    setTotalPrice((count + 1) * checkoutItem['price']);
  }
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalPrice((count - 1) * checkoutItem['price']);
    }
  };
  useEffect(() => {

  }, [totalPrice]);
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
    setLoading(false)
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    const checkoutItem = JSON.parse(localStorage.getItem("checkoutItem"));
    if (checkoutItem) {
      setCheckoutItem(checkoutItem);
    }
  }, [accessToken]);

  const fetchCurrentUser = async () => {
    const user = CommonUtil.parseJwt(accessToken);
    setLoggedUser(user);
  };

  async function triggerPayment() {
    if (accessToken) {
      checkoutItem.sessionCount = count;
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/orders`, {
        method: 'POST', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`
        }, body: JSON.stringify(checkoutItem),
      });
      let responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        console.log('Data submitted successfully', responseBody);

        window.snap.pay(responseBody['result']['data'], {
          onClose: () => {
            alert('Your payment is postponed, you can continue this order next time');
          }
        });
      } else {
        console.error('Failed to submit data', responseBody);
      }
    }
  }

// Then somewhere else on your React component, `window.snap` global object will be available to use
// e.g. you can then call `window.snap.pay( ... )` function.
  return (<>
    {loading ? <Loading/> : (<LandingWrapper>
      {loggedUser !== undefined ? <>

        <div
          className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">Payment Checkout</a>

          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg
                    >
                  </a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#">2</a>
                  <span className="font-semibold text-gray-900">Confirmation</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#">3</a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <Image className="m-2 h-24 w-28 rounded-md border object-cover object-center z-2"
                         src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                         alt=""/>
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{checkoutItem['topic']}</span>
                    <span className="float-right text-gray-400">42EU - 8.5US</span>
                    <p className="text-lg font-bold">$138.99</p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-4 text-xl">
                  <button onClick={handleDecrement}>-</button>
                  <div>{count}</div>
                  <button onClick={handleIncrement}>+</button>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={400}
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'today,dayGridMonth'
                }}
                buttonText={{
                  today: 'Today',
                  month: 'Month',
                  week: 'Week',
                  day: 'Day',
                  list: 'list'
                }}
                editable={true}
              />
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div className="">
              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                <input type="text" id="email" name="email" readOnly
                       className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                       placeholder="your.email@gmail.com" value={`${loggedUser.email}`}/>
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
              </div>
              <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Full Name</label>
              <div className="relative">
                <input type="text" id="card-holder" name="card-holder" readOnly
                       className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                       placeholder="Your full name here" value={`${loggedUser.name}`}/>
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
                  </svg>
                </div>
              </div>
              <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Telephone
                Number</label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input type="text" id="billing-address" name="billing-address" readOnly
                         value={`${loggedUser.telephone}`}
                         className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                         placeholder="Street Address"/>
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img className="h-4 w-4 object-contain"
                         src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt=""/>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p
                    className="font-semibold text-gray-900">Rp {totalPrice === 0 ? checkoutItem['price'] : totalPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Tax</p>
                  <p
                    className="font-semibold text-gray-900">Rp {(Number((totalPrice === 0 ? checkoutItem['price'] : totalPrice) * 0.1).toFixed(1))}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p
                  className="text-2xl font-semibold text-gray-900">Rp {totalPrice === 0 ? checkoutItem['price'] : totalPrice + (Number((totalPrice === 0 ? checkoutItem['price'] : totalPrice) * 0.1).toFixed(1))}</p>
              </div>
            </div>
            <button onClick={triggerPayment}
                    className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place
              Order
            </button>
          </div>

        </div>
      </> : (<Loading/>)}
    </LandingWrapper>)}
  </>)
}
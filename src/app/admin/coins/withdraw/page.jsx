"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import React, {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter, useSearchParams} from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";


export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const amountCoinOption = {
    10: 10000, 20: 20000, 30: 30000, 40: 40000, 50: 50000, 60: 60000, 70: 70000, 80: 80000, 90: 90000
  }
  const [orderHistory, setOrderHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000,
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/educations');
    }
  }, [searchParams, router]);

  async function triggerPaymentCoin(amountCoin, totalPrice) {

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/coins`, {
      method: 'POST', body: JSON.stringify({
        coinAmount: amountCoin, totalPrice: totalPrice,
      }), includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      console.log(responseBody);
      window.snap.pay(responseBody['result']['data'], {
        onClose: () => {
          alert('Your payment is postponed, you can continue this order next time');
        }
      })
      console.log('Data submitted successfully', responseBody);
    } else {
      console.error('Failed to submit data', responseBody);
    }
  }

  useEffect(() => {
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

    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonStyle();
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    setAccessToken(Cookies.get("accessToken"));
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  useEffect(() => {
    fetchHistoryOrder();
  }, [accessToken]);

  async function fetchHistoryOrder() {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/coins`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      setOrderHistory(responseBody['result']['data']);
    } else {
      console.error('Failed to submit data', responseBody);
    }
  }

  return (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <h1>Pendidikan Mentor</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item active"><a href="#">Admin</a></div>
          <div className="breadcrumb-item"><a href="#">Mentor</a></div>
          <div className="breadcrumb-item">Pendidikan</div>
        </div>
      </div>

      <div className="section-body">
        <section className="hero-section">
          {loading ? (  // Tampilkan loading selama data belum tersedia
            <Loading/>) : (<div className='d-flex flex-row'>
            <div className="col-12 col-md-6 col-lg-3 pl-0">
              {orderHistory?.length > 0 ? (orderHistory.map((item, index) => (<div className="card card-primary">
                <div className="card-body">
                  <p className='mb-0'>Total Harga: {item.totalPrice}</p>
                  <p className='mb-0'>Jumlah Koin: {item.coinAmount}</p>
                  <p className='mb-0'>Tanggal: {item.createdAt.substring(0, 10)}</p>
                </div>
              </div>))) : <></>}
            </div>
            <div className="col-12 col-md-6 col-lg-9 pr-0">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Informasi Pengguna</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row flex-wrap">
                    {Object.entries(amountCoinOption).map(([option, index]) => (

                      <div className="col-12 col-md-6 col-lg-4" key={'option-coin-' + index}
                           style={{cursor: 'pointer'}}>
                        <div className="card card-danger " onClick={() => triggerPaymentCoin(option, index)}>
                          <div className="card-body">
                            <div className="d-flex flex-row justify-content-center"
                                 style={{gap: "8" + "px"}}>
                              <Image src={"/assets/coin.svg"} alt="Star" width={35} height={35}/>
                              <h4 className={'text-primary my-auto'}>{option}</h4>
                            </div>
                            <hr/>
                            <h4 className={'text-center text-black'}>Rp. {index}</h4>
                          </div>
                        </div>
                      </div>))}
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </section>
      </div>
    </section>
  </AdminWrapper>)
}
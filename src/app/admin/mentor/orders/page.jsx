"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Loading} from "@/components/admin/Loading";
import Image from "next/image";


export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allOrder, setAllOrder] = useState({});
  const [loading, setLoading] = useState(true);

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
    console.log(Cookies.get("accessToken"))
    setAccessToken(Cookies.get("accessToken"));
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);


  async function initiatePayment(snapToken) {
    window.snap.pay(snapToken, {
      onClose: () => {
        alert('Your payment is postponed, you can continue this order next time');
      }
    });
  }

  useEffect(() => {
    fetchAllOrder()
  }, [accessToken]);

  async function fetchAllOrder() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/orders`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        console.log(responseBody);
        if (responseFetch.ok) {
          setAllOrder(responseBody.result.data);
        } else {
          console.error('Failed to fetch experiences', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  const isOrderExpired = (createdAt) => {
    const orderTime = new Date(createdAt).getTime();
    const currentTime = Date.now();

    // 24 jam dalam milidetik
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    // Periksa apakah waktu sekarang lebih dari 24 jam dari createdAt
    return currentTime - orderTime > twentyFourHoursInMs;
  };

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

        <h2 className="section-title">Articles</h2>
        <p className="section-lead">This article component is based on card and flexbox.</p>
        <div className="row">
          {loading ? (  // Tampilkan loading selama data belum tersedia
            <Loading/>) : (allOrder.length > 0 ? (allOrder.map((mentorAssistance) => (
            <div className="col-12 col-md-12 col-lg-12" key={`mentorAssistance-${mentorAssistance.id}`}>
              <article className="article article-style-c d-flex flex-row">
                <div className="col-sm-12 col-md-5 col-lg-4 p-0">
                  <Image src={`/images/authentication/login.jpg`} alt=""
                         className="w-100 h-100 m-0 p-0 object-cover" width={500}
                         height={500}/>
                  {/* Overlay muncul jika order expired */}
                  {isOrderExpired(mentorAssistance.createdAt) && (<div className="expired-overlay">
                    <span className="expired-text">Expired</span>
                  </div>)}
                </div>
                <div className="col-8">
                  <div className="article-details">
                    <div className="article-category"><a href="#">News</a>
                      <div className="bullet"></div>
                      <a href="#">5 Days</a></div>
                    <div className="article-title">
                      <h2><a href="#">{mentorAssistance.assistance.topic}</a></h2>
                    </div>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. </p>
                    <div className="article-user">
                      <img alt="image" src="../assets/img/avatar/avatar-1.png"/>
                      <div className="article-user-details float-left">
                        <div className="user-detail-name">
                          <a href="#">Hasan Basri</a>
                        </div>
                        <div className="text-job">Web Developer</div>
                      </div>
                      {!isOrderExpired(mentorAssistance.createdAt) && (<>
                        <a href="#" className="btn btn-outline-primary float-right mt-1 ml-2">Cancel</a>
                        <a href="#" onClick={() => {
                          initiatePayment(mentorAssistance['transactionToken'])
                        }} className="btn  btn-primary float-right mt-1">Continue</a>
                      </>)}
                    </div>
                  </div>
                </div>
              </article>
            </div>))) : (<Loading/>))}
        </div>
      </div>
    </section>
  </AdminWrapper>)
}
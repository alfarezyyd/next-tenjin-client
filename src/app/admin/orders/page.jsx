"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import React, {useEffect, useRef, useState} from "react";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import Image from "next/image";
import 'summernote/dist/summernote-bs4.css'
import '@/../public/assets/css/components.css'
import '@/../public/assets/css/orders.scss'

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allOrder, setAllOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const reviewRef = useRef(null)
  const [orderReview, setOrderReview] = useState({});
  const [review, setReview] = useState(null)
  const [rating, setRating] = useState(null)
  const [errors, setErrors] = useState(null)
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
    document.body.appendChild(scriptTag);

    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await import('sweetalert/dist/sweetalert.min')
      await import('summernote/dist/summernote-bs4.js');
      $(reviewRef.current).on("summernote.change", () => {
        setReview(($(reviewRef.current).val()));
      });
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
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
        if (responseFetch.ok) {
          setAllOrder(responseBody.result.data);
          console.log(responseBody.result.data);
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


  async function handleOrderDone(selectedOrder) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/orders/finished/${selectedOrder.id}`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          const updatedOrders = allOrder.map(order => {
            if (order.id === selectedOrder.id) {
              return {...order, orderStatus: 'FINISHED'}; // Perbarui properti yang diinginkan
            }
            return order; // Tetap kembalikan item lain tanpa perubahan
          });

          setAllOrder(updatedOrders);
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

  async function updateReviewUser() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/reviews`, {
          method: 'POST', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderReview.id,
            assistantId: orderReview.assistantId,
            rating: rating,
            review: review
          }),
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          const updatedOrders = allOrder.map(order => {
            if (order.id === orderReview.id) {
              return {...order, orderStatus: 'REVIEWED'}; // Perbarui properti yang diinginkan
            }
            return order; // Tetap kembalikan item lain tanpa perubahan
          });
          setAllOrder(updatedOrders);
          const $ = (await import('jquery')).default;
          $('#reviewModal').modal('hide')
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

  return (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Riwayat Order</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Riwayat Order</div>
          </div>
        </div>

        <div className="section-body">

          <h2 className="section-title">Overview</h2>
          <p className="section-lead">Kelola dan pantau pesanan Anda dengan mudah. Lihat status, detail, dan riwayat
            transaksi semuanya di satu halaman.</p>
          <div className="row">
            <div className="container">
              <div className="col-12 col-md-12 col-lg-6 alert alert-warning alert-has-icon mx-auto">
                <div className="alert-icon"><i className="far fa-lightbulb"></i></div>
                <div className="alert-body">
                  <div className="alert-title">Perhatian</div>
                  Jika Anda sudah membayar namun invoice tidak dapat dilihat, mohon tunggu beberapa saat dan cek secara
                  berkala. Apabila terdapat kesalahan, mohon hubungi Admin untuk mendapatkan arahan.
                </div>
              </div>
            </div>
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>) : (allOrder.length > 0 ? (allOrder.map((mentorAssistance) => (
              <div className="col-12 col-md-12 col-lg-12" key={`mentorAssistance-${mentorAssistance.id}`}>
                <article className="article article-style-c d-flex flex-row">
                  <div className="col-sm-12 col-md-5 col-lg-4 p-0">
                    <Image src={`/images/authentication/login.jpg`} alt=""
                           className="w-100 h-100 m-0 p-0 object-cover" width={500}
                           height={500}/>
                    {(mentorAssistance.orderPaymentStatus === "PAID") ? (
                      <div className="expired-overlay">
                        <span className="expired-text">LUNAS</span>
                      </div>) : (
                      isOrderExpired(mentorAssistance.createdAt) &&
                      (
                        <div className="expired-overlay">
                          <span className="expired-text">Expired</span>
                        </div>
                      )
                    )}

                  </div>
                  <div className="col-8">
                    <div className="article-details">
                      <div className="article-category"><a href="#">{mentorAssistance.assistance.category.name}</a>
                        <div className="bullet"></div>
                        <a href="#">5 Days</a></div>
                      <div className="article-title">
                        <h2><a href="#">{mentorAssistance.assistance.topic}</a></h2>
                      </div>
                      <p dangerouslySetInnerHTML={{__html: mentorAssistance.assistance.description}}></p>
                      <div className="article-user">
                        <div className="article-user-details float-left">
                          <div className="user-detail-name">
                            <a href="#">Order Status : {mentorAssistance.orderStatus}</a>
                          </div>
                          <div className="text-job">Booking Status : {mentorAssistance.orderCondition}</div>
                        </div>
                        {!isOrderExpired(mentorAssistance.createdAt) && (mentorAssistance.orderPaymentStatus === "NOT_YET_PAID") && (<>
                          <a href="#" className="btn btn-outline-primary float-right mt-1 ml-2">Cancel</a>
                          <a href="#" onClick={() => {
                            initiatePayment(mentorAssistance['transactionToken'])
                          }} className="btn  btn-primary float-right mt-1">Continue</a>
                        </>)}
                        {(mentorAssistance.orderPaymentStatus === "PAID") &&
                          (<a
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/orders/${mentorAssistance.transactionToken.toString()}`}
                            className="btn  btn-outline-success float-right mt-1">Invoice</a>)}
                        {((mentorAssistance.orderStatus !== "FINISHED" && mentorAssistance.orderStatus !== "REVIEWED") && (mentorAssistance.orderPaymentStatus === "PAID") && mentorAssistance.orderCondition === "APPROVED") &&
                          (<button
                            className="btn  btn-primary float-right mt-1 mr-1" onClick={() => {
                            swal({
                              title: 'Apakah anda yakin pesanan anda selesai?',
                              text: 'Anda tidak dapat mengubah kembali jika sudah konfirmasi selesai',
                              icon: 'warning',
                              buttons: true,
                              dangerMode: true,
                            })
                              .then((willDelete) => {
                                if (willDelete) {
                                  handleOrderDone(mentorAssistance);
                                  swal('Konfirmasi selesai berhasil dilakukan! Tolong berikan review', {
                                    icon: 'success',
                                  });
                                } else {
                                  swal('Konfirmasi selesai dibatalkan');
                                }
                              });
                          }}>Konfirmasi
                            Selesai</button>)}
                        {(mentorAssistance.orderStatus === "FINISHED" && (mentorAssistance.orderPaymentStatus === "PAID") && mentorAssistance.orderCondition === "APPROVED") &&
                          (<button data-toggle="modal" data-target="#reviewModal" onClick={() => {
                            setOrderReview(mentorAssistance);
                          }}
                                   className="btn  btn-primary float-right mt-1 mr-1">Berikan Review</button>)}

                      </div>
                    </div>
                  </div>
                </article>
              </div>))) : (<Loading/>))}
          </div>
        </div>
      </section>
      <div className="modal fade" tabIndex="-1" role="dialog" id="reviewModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bagikan Pengalaman Anda Bersama Mentor</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row-reverse justify-content-center">
                {Array.from({length: 5}, (_, i) => 5 - i).map((value) => (
                  <React.Fragment key={value}>
                    <input
                      className={`star star-${value}`}
                      id={`star-${value}`}
                      value={value}
                      onChange={() => {
                        setRating(value);
                      }}
                      type="radio"
                      name="star"
                    />
                    <label
                      className={`star star-${value}`}
                      htmlFor={`star-${value}`}
                    ></label>
                  </React.Fragment>
                ))}
              </div>
              <hr/>
              <textarea ref={reviewRef}
                        className={`summernote-simple`}
                        name="description" id="description"></textarea>
              <div className="modal-footer bg-whitesmoke br">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={updateReviewUser}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminWrapper>
  )
}
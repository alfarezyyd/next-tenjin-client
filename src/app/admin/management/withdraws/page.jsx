"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import 'select2/dist/css/select2.min.css';

import '@/../public/assets/css/components.css'

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: ''
  });
  const router = useRouter();
  const [allWithdraws, setAllWithdraws] = useState([]);
  const [activeWithdraw, setActiveWithdraw] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'tags-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/management/tags');
    }
  }, [router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await import('select2/dist/js/select2.min');

      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  async function fetchWithdrawRequest() {
    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/withdraws`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        },
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        console.log(responseBody.result.data);
        setAllWithdraws(responseBody.result.data);
        setActiveWithdraw(responseBody.result.data[0]);
      } else {
        console.log(responseBody)
        console.error('Failed to fetch education', responseBody);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Menghentikan loading ketika data sudah diterima
    }

  }

  useEffect(() => {
    if (accessToken) {
      fetchWithdrawRequest()
    }
  }, [accessToken]);


  async function triggerConfirm(e) {
    e.preventDefault();
    if (accessToken) {
      try {
        console.log(accessToken);
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/withdraws/confirm`, {
          method: 'POST', includeCredentials: true,
          body: JSON.stringify({
            withdrawId: activeWithdraw.id
          }),
          headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
          }
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          const withdraw = allWithdraws.find(value => value.id === activeWithdraw.id)
          withdraw.withdrawPaymentStatus = "SENT"
          setAllWithdraws({
            ...allWithdraws.filter(value => value.id === activeWithdraw.id),
            withdraw
          })
        } else {
          console.error('Failed to fetch education', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  return (loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Withdraw Request</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Management</a></div>
            <div className="breadcrumb-item">Kategori</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Overview</h2>
          <p className="section-lead w-50">
            Kelola data kategori management dengan praktis. Tambahkan, perbarui, atau hapus informasi kategori untuk
            mendukung profil management yang kredibel.
          </p>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Tickets</h4>
                  </div>
                  <div className="card-body">
                    <a href="#" className="btn btn-primary btn-icon icon-left btn-lg btn-block mb-4 d-md-none"
                       data-toggle-slide="#ticket-items">
                      <i className="fas fa-list"></i> All Tickets
                    </a>
                    <div className="tickets">
                      <div className="ticket-items" id="ticket-items">
                        {allWithdraws.length > 0 && (allWithdraws.map((item) => {
                          return (
                            <div className="ticket-item active" key={`withdraws-${item.id}`} onClick={() => {
                              setActiveWithdraw(item);
                            }}>
                              <div className="ticket-title">
                                <h4>{item?.user?.name}</h4>
                              </div>
                              <div className="ticket-desc">
                                <div>{item?.withdrawPaymentStatus}</div>
                                <div className="bullet"></div>
                                <div>{item?.createdAt?.substring(0, 10)}</div>
                              </div>
                            </div>
                          )
                        }))}
                      </div>
                      <div className="ticket-content">
                        <div className="ticket-header">

                          <div className="ticket-detail">
                            <div className="ticket-title">
                              <h4>{activeWithdraw?.user?.name}</h4>
                            </div>
                            <div className="ticket-info">
                              <div className="font-weight-600">{activeWithdraw?.withdrawPaymentStatus}</div>
                              <div className="bullet"></div>
                              <div
                                className="text-primary font-weight-600">{activeWithdraw?.createdAt?.substring(0, 10)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="ticket-description">
                          <div className="col-12 col-md-12 col-lg-12">
                            <div className="card card-primary">
                              <div className="card-header">
                                <h4 className={"mx-auto"}>Informasi Bank Account</h4>
                              </div>
                              <div className="card-body">
                                <ul className="list-group">
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Nama Pemilik Rekening
                                    <span
                                      className="badge badge-primary badge-pill">{activeWithdraw?.mentorBankAccount?.accountHolderName}</span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Nomor Rekening
                                    <span
                                      className="badge badge-primary badge-pill">{activeWithdraw?.mentorBankAccount?.accountNumber}</span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Nama Bank
                                    <span
                                      className="badge badge-primary badge-pill">{activeWithdraw?.mentorBankAccount?.bankName}</span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Email Penerima Pembayaran
                                    <span
                                      className="badge badge-primary badge-pill">{activeWithdraw?.mentorBankAccount?.paymentRecipientEmail}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12">
                            <div className="card card-primary">
                              <div className="card-header">
                                <h4 className={"mx-auto"}>Informasi Withdraw</h4>
                              </div>
                              <div className="card-body">
                                <ul className="list-group">
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Total Withdraw
                                    <span
                                      className="badge badge-primary badge-pill">{activeWithdraw?.totalBalance}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="ticket-divider"></div>
                          <div className="ticket-form">
                            <form onSubmit={triggerConfirm}>
                              <div className="form-group">
                              </div>
                              <div className="form-group text-right">
                                <button className="btn btn-primary btn-lg">
                                  Konfirmasi Dikirim
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>
  ))
}
"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {Loading} from "@/components/admin/Loading";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import CommonScript from "@/components/admin/CommonScript";
import '@/../public/assets/css/components.css'

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [allHistory, setAllHistory] = useState([]);
  useEffect(() => {

    async function loadAssets() {
      const $ = (await import('jquery')).default;
      window.jQuery = $;
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
    setAccessToken(Cookies.get("accessToken"));

  }, []);

  const fetchWithdrawHistory = async () => {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/withdraws/self`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });
    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setAllHistory(responseBody.result.data);
      console.log(responseBody.result.data);
    } else {
    }
  };
  useEffect(() => {
    fetchWithdrawHistory()
  }, [accessToken]);
  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Riwayat Penarikan Saldo</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item "><a href="/admin/dashboard">Dashboard</a></div>
            <div className="breadcrumb-item"><a href="/admin/finance/withdraw">Penarikan Saldo</a></div>
            <div className="breadcrumb-item active">Riwayat Penarikan Saldo</div>
          </div>
        </div>

        <div className="section-body">
          <section className="hero-section">
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>) : (
              <div className="row">
                <div className="col-12">
                  <div className="activities">
                    {allHistory?.length > 0 ? allHistory.map((item, index) => (
                      <div className="activity" key={`active-history-${index}`}>
                        <div className="activity-icon bg-primary text-white shadow-primary">
                          <i className="fas fa-comment-alt"></i>
                        </div>
                        <div className="activity-detail">
                          <div className="mb-2">
                            <span className="text-job text-primary">{item?.createdAt.substring(0, 10)}</span>
                            <span className="bullet"></span>
                            <a className="text-job" href="#">{item?.withdrawPaymentStatus}</a>
                          </div>
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Nama Pemilik Rekening
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.userBankAccount?.accountHolderName}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Nomor Rekening
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.userBankAccount?.accountNumber}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Nama Bank
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.userBankAccount?.bankName}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Email Penerima Pembayaran
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.userBankAccount?.paymentRecipientEmail}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Status
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.withdrawPaymentStatus}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Dikirim Pada
                              <span
                                className="badge badge-primary badge-pill ml-4">{item?.sentAt?.substring(0, 10)}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )) : (
                      <div className="col-12 col-md-6 col-sm-6 p-0 mx-auto">
                        <div className="card">
                          <div className="card-header">
                            <h4>Empty Data</h4>
                          </div>
                          <div className="card-body">
                            <div className="empty-state" data-height="400">
                              <div className="empty-state-icon">
                                <i className="fas fa-question"></i>
                              </div>
                              <h2>We could not find any data</h2>
                              <p className="lead">
                                Sorry we can not find any data, to get rid of this message, make at least 1 entry.
                              </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </AdminWrapper>)

}
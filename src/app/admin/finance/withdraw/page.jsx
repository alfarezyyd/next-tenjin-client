"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter, useSearchParams} from "next/navigation";
import '@/../public/assets/css/withdraw.scss'
import Image from "next/image";
import {CommonUtil} from "@/common/utils/common-util";
import CommonScript from "@/components/admin/CommonScript";
import Link from "next/link";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [errorMessages, setErrorMessages] = useState(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const amountBalanceOption = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000]
  useEffect(() => {

    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
    setAccessToken(Cookies.get("accessToken"));

  }, []);

  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'withdraw-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/educations');
    }
  }, [searchParams, router]);

  async function createWithdrawRequest() {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/withdraws`, {
      method: 'POST', body: JSON.stringify({
        totalBalance: withdrawValue,
      }), includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      toast.success("Withdraw request successfully created! please wait")
    } else {

      if (responseBody.errors) {
        const errorMessages = {};
        responseBody.errors.message.forEach((error) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrorMessages(errorMessages);
      } else {
        toast.error(responseBody.message)
      }
    }
  }


  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);
  useEffect(() => {
    if (decodedAccessToken) {
      fetchUserData();
    }
  }, [decodedAccessToken]);

  async function fetchUserData() {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${decodedAccessToken.uniqueId}`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      setUserData(responseBody['result']['data']);
    } else {
      console.error('Failed to submit data', responseBody);
    }
  }

  async function fillCurrencyValue(value) {
    setWithdrawValue(value)
  }

  return (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <h1>Menarik Saldo</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item active"><a href="#">Admin</a></div>
          <div className="breadcrumb-item"><a href="#">Mentor</a></div>
          <div className="breadcrumb-item">Pendidikan</div>
        </div>
      </div>

      <div className="section-body">
        <h2 className="section-title">Overview</h2>
        <p className="section-lead w-50">
          Ajukan dan kelola permintaan penarikan dana secara cepat dan mudah. Pantau status permintaan Anda, pastikan
          semua informasi akurat.
        </p>
        <section className="hero-section">
          {loading ? (  // Tampilkan loading selama data belum tersedia
            <Loading/>) : (<div className="row">
            <div className="col-6 col-md-6 col-lg-5 pr-0">
              <div className="card card-primary mx-auto">
                <div className="card-header">
                  <h4>Informasi Pengguna</h4>
                </div>
                <div className="card-body">
                  <div className="credit-card">
                    <div className="credit-card-front">
                      <div className="d-flex justify-content-between">
                        <img
                          src="data:image/png;base64,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"
                          alt="Chip" width="50"/>
                        <div className="hologram"></div>
                      </div>
                      <div className="card-number">
                        Rp. {userData?.totalBalance}
                      </div>
                      <div className="d-flex justify-content-between align-items-end">
                        <div>
                          <div className="card-holder mb-1">{userData?.name}</div>
                          <div className="card-expires">Valid Thru: 12/25</div>
                        </div>
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" width="60"/>
                      </div>
                    </div>
                    <div className="credit-card-back">
                      <div className="magnetic-strip"></div>
                      <div className="cvv">
                        <span className="me-2">CVV</span>123
                      </div>
                      <div className="card-details p-3">
                        This card is property of Our Bank. Misuse is criminal offence. If found, please return to
                        Our
                        Bank or to
                        the nearest bank.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/admin/finance/withdraw/history">
                <div className="alert alert-primary alert-has-icon">
                  <div className="alert-icon"><i className="far fa-lightbulb"></i></div>
                  <div className="alert-body">
                    <div className="alert-title">Lihat Riwayat Withdraw
                      <i className="fas fa-arrow-right fa-10x pl-2"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-6 col-lg-7 pr-0">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Informasi Pengguna</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row flex-wrap">
                    {(amountBalanceOption).map((value) => (
                      <div className="col-12 col-md-6 col-lg-4" key={'option-coin-' + value}
                           style={{cursor: 'pointer'}} onClick={() => fillCurrencyValue(value)}>
                        <div className="card card-danger">
                          <div className="card-body">
                            <div className="d-flex flex-row justify-content-center"
                                 style={{gap: "8" + "px"}}>
                              <Image src={"/assets/coin.svg"} alt="Star" width={25} height={25}/>
                              <h5 className={'text-primary my-auto'}>{value}</h5>
                            </div>
                          </div>
                        </div>
                      </div>))}
                  </div>
                  <div className="col-12 col-md-12 col-lg-12" style={{cursor: 'pointer'}}>
                    <div className="card card-danger">
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor={"currency"}>Currency</label>
                          <div className="input-group d-flex" style={{gap: "8" + "px"}}>
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                Rp
                              </div>
                            </div>
                            <input id={"currency"} type="text"
                                   className={`form-control currency ${errorMessages?.totalBalance ? 'is-invalid' : ''}`}
                                   value={withdrawValue}
                                   onChange={(e) => {
                                     setWithdrawValue(e.target.value)
                                   }}/>
                            <button className="btn btn-primary" type={"submit"} onClick={createWithdrawRequest}>Submit
                            </button>
                            <div className="invalid-feedback">{errorMessages?.totalBalance}</div>
                          </div>

                        </div>
                      </div>
                    </div>
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
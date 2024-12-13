"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import {Loading} from "@/components/admin/Loading";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {CommonUtil} from "@/common/utils/common-util";
import {SettingSidebar} from "@/components/admin/SettingSidebar";


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [mentorAccount, setMentorAccount] = useState({});
  const [formData, setFormData] = useState({
    accountHolderName: "", bankName: "", accountNumber: "", paymentRecipientEmail: "",
  });

  function handleChange(e, name) {

    // Update payloadRequest state
    setFormData((prevPayloadRequest) => ({
      ...prevPayloadRequest, [name]: e.target.value,
    }));
  }


  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await CommonScript();
    }
    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
    setAccessToken(Cookies.get("accessToken"))
  }, [])

  async function fetchMentorAccount() {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/settings/mentor-account`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
      },
    });
    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      setMentorAccount(responseBody.result.data)
      const mentorAccount = responseBody.result.data;
      setFormData({
        accountHolderName: mentorAccount.accountHolderName,
        bankName: mentorAccount.bankName,
        accountNumber: mentorAccount.accountNumber,
        paymentRecipientEmail: mentorAccount.paymentRecipientEmail,
      })
    } else {
    }
  }

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
      fetchMentorAccount()
    }
  }, [accessToken]);


  async function handleMentorAccountChange(e) {
    e.preventDefault()
    if (accessToken) {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/settings/mentor-account`, {
        method: 'PUT', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
        }, body: JSON.stringify({
          ...formData,
          id: mentorAccount.id
        }),
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        toast.success("Bank account successfully updated!")
      } else {
        const errorMessages = {};
        console.log(responseBody.errors);
        responseBody.errors.message.forEach((error) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrors(errorMessages);
      }
    }

  }

  return (
    loading ? (<Loading/>) : (
      <AdminWrapper>
        <section className="section">
          <div className="section-header">
            <div className="section-header-back">
              <a href="/admin/settings" className="btn btn-icon"><i className="fas fa-arrow-left"></i></a>
            </div>
            <h1>General Settings</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item "><a href="/admin/dashboard">Dashboard</a></div>
              <div className="breadcrumb-item "><a href="/admin/settings">Settings</a></div>
              <div className="breadcrumb-item active">Informasi Rekening</div>
            </div>
          </div>

          <div className="section-body">
            <h2 className="section-title">All About General Settings</h2>
            <p className="section-lead">
              You can adjust all general settings here
            </p>


            <div id="output-status"></div>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h4>Jump To</h4>
                  </div>
                  <div className="card-body">
                    <SettingSidebar currentUser={decodedAccessToken}/>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <form id="general-data-form" onSubmit={handleMentorAccountChange} method='POST'
                      encType='multipart/form-data'>
                  <div className="card" id="settings-card">
                    <div className="card-header">
                      <h4>General Settings</h4>
                    </div>
                    <div className="card-body">

                      <p className="text-muted">Pengaturan mengenai perubahan password yang dimiliki pengguna</p>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">Nama Pemilik Rekening</label>
                        <div className="col-sm-6 col-md-8 ">
                          <input
                            type="text"
                            className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
                            id="accountHolderName"
                            name="accountHolderName"
                            placeholder="Nama Pemilik Rekening"
                            value={formData.accountHolderName}
                            onChange={(e) => {
                              handleChange(e, "accountHolderName")
                            }}
                          />
                          <div className="invalid-feedback">{errors.accountHolderName}</div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">Nama Bank</label>
                        <div className="col-sm-6 col-md-8 ">
                          <input
                            type="text"
                            className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
                            id="bankName"
                            name="bankName"
                            placeholder="Nama Bank"
                            value={formData.bankName}
                            onChange={(e) => {
                              handleChange(e, "bankName")
                            }}
                          />
                          <div className="invalid-feedback">{errors.bankName}</div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">Nomor Rekening</label>
                        <div className="col-sm-6 col-md-8 ">
                          <input
                            type="text"
                            className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Nomor Rekening"
                            value={formData.accountNumber}
                            onChange={(e) => {
                              handleChange(e, "accountNumber")
                            }}
                          />
                          <div className="invalid-feedback">{errors.accountNumber}</div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">
                          Email Penerima Pembayaran
                        </label>
                        <div className="col-sm-6 col-md-8 ">
                          <input
                            type="text"
                            className={`form-control ${errors.paymentRecipientEmail ? 'is-invalid' : ''}`}
                            id="paymentRecipientEmail"
                            name="paymentRecipientEmail"
                            placeholder="Email Penerima Pembayaran"
                            value={formData.paymentRecipientEmail}
                            onChange={(e) => {
                              handleChange(e, "paymentRecipientEmail")
                            }}
                          />
                          <div className="invalid-feedback">{errors.paymentRecipientEmail}</div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-whitesmoke text-md-right">
                      <button className="btn btn-primary mr-2" id="save-btn">Save Changes</button>
                      <button className="btn btn-secondary" type="button">Reset</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </AdminWrapper>
    )
  )
}
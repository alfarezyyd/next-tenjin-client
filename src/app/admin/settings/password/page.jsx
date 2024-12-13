"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import {Loading} from "@/components/admin/Loading";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {CommonUtil} from "@/common/utils/common-util";
import {SettingSidebar} from "@/components/admin/SettingSidebar";


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [payloadRequest, setPayloadRequest] = useState(null);
  const [errors, setErrors] = useState({});
  const [toggleVisibility, setToggleVisibility] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;

    // Update payloadRequest state
    setPayloadRequest((prevPayloadRequest) => ({
      ...prevPayloadRequest, [name]: value,
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

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);


  async function handlePasswordSetting(e) {
    e.preventDefault()
    if (accessToken) {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/settings/change-password`, {
        method: 'PUT', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
        }, body: JSON.stringify(payloadRequest),
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        toast.success("Password changed successfully!")
      } else {
        const errorMessages = {};
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
              <div className="breadcrumb-item active">Password</div>
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
                <form id="general-data-form" onSubmit={handlePasswordSetting} method='POST'
                      encType='multipart/form-data'>
                  <div className="card" id="settings-card">
                    <div className="card-header">
                      <h4>General Settings</h4>
                    </div>
                    <div className="card-body">
                      {decodedAccessToken?.isExternal && (
                        <div className="alert alert-warning col-8 mx-auto">
                          <div className="alert-title">Warning</div>
                          Karena akun anda terdeteksi login dari autoritas lain seperti Google, anda
                          tidak perlu untuk
                          mengatur password
                        </div>
                      )}
                      <p className="text-muted">Pengaturan mengenai perubahan password yang dimiliki pengguna</p>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">Old Password</label>
                        <div className="col-sm-6 col-md-8 ">
                          <div className="input-group">
                            <input type={toggleVisibility ? "text" : "password"} name="oldPassword"
                                   className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                                   id="oldPassword"
                                   autoComplete={"on"}
                                   disabled={Boolean(decodedAccessToken?.isExternal)}
                                   onChange={handleChange}/>
                            <div className="input-group-append">
                              <div className="input-group-text" onClick={() => {
                                setToggleVisibility(!toggleVisibility)
                              }}>
                                {toggleVisibility ? <FaEyeSlash/> : <FaEye/>}
                              </div>
                            </div>
                            <div className="invalid-feedback">{errors.oldPassword}</div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">New Password</label>
                        <div className="col-sm-6 col-md-8 ">
                          <div className="input-group">
                            <input type={toggleVisibility ? "text" : "password"} name="newPassword"
                                   className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                   id="newPassword"
                                   autoComplete={"on"}
                                   disabled={Boolean(decodedAccessToken?.isExternal)}
                                   onChange={handleChange}/>
                            <div className="input-group-append">
                              <div className="input-group-text" onClick={() => {
                                setToggleVisibility(!toggleVisibility)
                              }}>
                                {toggleVisibility ? <FaEyeSlash/> : <FaEye/>}
                              </div>
                            </div>
                            <div className="invalid-feedback">{errors.newPassword}</div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                        </div>
                      </div>
                      <div className="form-group row align-items-center">
                        <label htmlFor="site-title"
                               className="form-control-label col-sm-3 text-md-right">Confirm Password</label>
                        <div className="col-sm-6 col-md-8 ">
                          <div className="input-group">
                            <input type={toggleVisibility ? "text" : "password"} name="confirmPassword"
                                   autoComplete={"on"}
                                   disabled={Boolean(decodedAccessToken?.isExternal)}
                                   className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                   id="confirmPassword"
                                   onChange={handleChange}/>
                            <div className="input-group-append">
                              <div className="input-group-text" onClick={() => {
                                setToggleVisibility(!toggleVisibility)
                              }}>
                                {toggleVisibility ? <FaEyeSlash/> : <FaEye/>}
                              </div>
                            </div>
                            <div className="invalid-feedback">{errors.confirmPassword}</div>

                          </div>
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
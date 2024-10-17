"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import {Loading} from "@/components/admin/Loading";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {FilePond, registerPlugin} from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const loadAssets = async () => {
      await import('filepond/dist/filepond.min.css');
      await CommonStyle();
      await CommonScript();
    }
    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
    setAccessToken(Cookies.get("accessToken"))
  }, [])

  useEffect(() => {
    fetchCurrentUser()
  }, [accessToken]);

  const fetchCurrentUser = async () => {
    if (accessToken) {
      const parsedAccessToken = CommonUtil.parseJwt(accessToken);
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${parsedAccessToken.uniqueId}`, {
        method: 'GET',
        includeCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }
      });
      const responseBody = await fetchResponse.json();
      console.log(responseBody, fetchResponse);
      if (fetchResponse.ok) {
        setCurrentUser(responseBody.result.data);
        console.log(responseBody.result.data);
        setLoadingData(false);
      } else {
        console.error(responseBody);
      }
    }
  }


  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <AdminWrapper>
          <section className="section">
            <div className="section-header">
              <div className="section-header-back">
                <a href="features-settings.html" className="btn btn-icon"><i className="fas fa-arrow-left"></i></a>
              </div>
              <h1>General Settings</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
                <div className="breadcrumb-item active"><a href="#">Settings</a></div>
                <div className="breadcrumb-item">General Settings</div>
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
                      <ul className="nav nav-pills flex-column">
                        <li className="nav-item"><a href="#" className="nav-link active">General</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">SEO</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Email</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">System</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Security</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Automation</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <form id="setting-form">
                    <div className="card" id="settings-card">
                      <div className="card-header">
                        <h4>General Settings</h4>
                      </div>
                      <div className="card-body">
                        <p className="text-muted">General settings such as, site title, site description, address and so
                          on.</p>
                        {loadingData ? (
                          <Loading/>
                        ) : (
                          <>
                            <div className="form-group row align-items-center">
                              <label htmlFor="site-title"
                                     className="form-control-label col-sm-3 text-md-right">Email</label>
                              <div className="col-sm-6 col-md-9">
                                <input type="text" name="site_title" className="form-control" id="site-title"
                                       value={currentUser.email}/>
                                {
                                  currentUser.emailVerifiedAt ?
                                    <small>Email verified at : {currentUser.emailVerifiedAt.substring(0, 10)} </small> :
                                    <small>Verify your email here : <a href="">Test</a> </small>
                                }

                              </div>
                            </div>
                            <div className="form-group row align-items-center">
                              <label className="form-control-label col-sm-3 text-md-right">
                                Jenis Kelamin
                              </label>
                              <div className="col-sm-6 col-md-9">
                                <div className="selectgroup w-100">
                                  <label className="selectgroup-item">
                                    <input type="radio" name="transportation" value="MAN"
                                           className="selectgroup-input"/>
                                    <span className="selectgroup-button selectgroup-button-icon"><i
                                      className="fas fa-male mr-2"></i> Laki Laki</span>
                                  </label>
                                  <label className="selectgroup-item">
                                    <input type="radio" name="transportation" value="WOMAN"
                                           className="selectgroup-input"
                                           checked=""/>
                                    <span className="selectgroup-button selectgroup-button-icon"><i
                                      className="fas fa-female mr-2"></i> Perempuan</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row align-items-center">
                              <label htmlFor="site-title"
                                     className="form-control-label col-sm-3 text-md-right">Nomor Telepon</label>
                              <div className="col-sm-6 col-md-9">
                                <input type="text" name="telephone" className="form-control" id="site-title"
                                       value={currentUser.telephone}/>
                              </div>
                            </div>
                            <div className="form-group row align-items-center">
                              <label htmlFor="site-title"
                                     className="form-control-label col-sm-3 text-md-right">Foto Profil</label>
                              <div className="col-sm-6 col-md-9">
                                <FilePond
                                  files={files}
                                  onupdatefiles={setFiles}
                                  allowMultiple={true}
                                  maxFiles={3}
                                  name="experienceResources"
                                  labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                                />
                              </div>
                            </div>

                          </>
                        )}

                      </div>
                      <div className="card-footer bg-whitesmoke text-md-right">
                        <button className="btn btn-primary" id="save-btn">Save Changes</button>
                        <button className="btn btn-secondary" type="button">Reset</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </AdminWrapper>
      )}
    </>

  )
}
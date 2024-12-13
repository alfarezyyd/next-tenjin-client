"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import {Loading} from "@/components/admin/Loading";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

import {FilePond, registerPlugin} from "react-filepond";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {SettingSidebar} from "@/components/admin/SettingSidebar";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [payloadRequest, setPayloadRequest] = useState();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'general-data-success'
      });

      router.replace('/admin/settings/general-data');

      // Bersihkan query param setelah menampilkan toast
    }
  }, [router]);


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
      await import('filepond/dist/filepond.min.css');
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
    setDecodedAccessToken(CommonUtil.parseJwt(accessToken))
  }, [accessToken]);


  const fetchCurrentUser = async () => {
    if (accessToken) {
      const parsedAccessToken = CommonUtil.parseJwt(accessToken);
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${parsedAccessToken.uniqueId}`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        const currentUser = responseBody.result.data
        setCurrentUser(currentUser);
        setPayloadRequest({
          name: currentUser.name,
          email: currentUser.email,
          gender: currentUser.gender,
          telephone: currentUser.telephone,
          emailVerifiedAt: currentUser.emailVerifiedAt,
        })
        if (currentUser.photoPath !== null) {
          setFile([{
            source: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${currentUser.photoPath}`,
            options: {type: 'input'}
          }]);
        }
      } else {
        console.error(responseBody);
      }
      setLoadingData(false);
    }
  }

  async function handleGeneralData(e) {
    e.preventDefault()
    console.log(file)
    if (file === undefined || file.length === 0) {
      toast.error('Mohon upload foto profil Anda!')
      return
    }
    if (accessToken) {
      const form = new FormData();

      Object.entries(payloadRequest).forEach(([key, value]) => {
        form.append(key, value);
      });

      form.append('photo', file[0].file)

      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/settings/general-data`, {
        method: 'PUT', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        }, body: form,
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        setLoadingData(false);
        console.log(responseBody.result.data);
        Cookies.set("accessToken", responseBody.result.data.accessToken)
        toast.success("Your general data successfully updated!")
      } else {
        console.log(responseBody.errors.message)
        toast.error("Terdapat error pada pengisian formulir, kembali!")
        const errorMessages = {};
        responseBody.errors.message.forEach((error) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrors(errorMessages);
      }
    }

  }

  return (loading && loadingData ? (<Loading/>) : (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <div className="section-header-back">
          <a href="/admin/settings" className="btn btn-icon"><i className="fas fa-arrow-left"></i></a>
        </div>
        <h1>General Settings</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item "><a href="/admin/dashboard">Dashboard</a></div>
          <div className="breadcrumb-item "><a href="/admin/settings">Settings</a></div>
          <div className="breadcrumb-item active">General Settings</div>
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
            <form id="general-data-form" onSubmit={handleGeneralData} method='POST' encType='multipart/form-data'>
              <div className="card" id="settings-card">
                <div className="card-header">
                  <h4>General Settings</h4>
                </div>
                <div className="card-body">
                  <p className="text-muted">Kelola informasi akun dan preferensi aplikasi untuk pengalaman yang lebih
                    sesuai.</p>
                  {loadingData ? (<Loading/>) : (<>
                    <div className="form-group row align-items-center">
                      <label htmlFor="site-title"
                             className="form-control-label col-sm-3 text-md-right">Email</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="text" name="email" className="form-control" id="email"
                               disabled={currentUser?.isExternal}
                               value={payloadRequest.email} onChange={handleChange}/>
                        {payloadRequest.emailVerifiedAt ?
                          <small>Email verified at : {payloadRequest.emailVerifiedAt.substring(0, 10)} </small> :
                          <small>Verify your email : <a href="/admin/verify-email">here</a> </small>}

                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label htmlFor="site-title"
                             className="form-control-label col-sm-3 text-md-right">Nama Lengkap</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="text" name="name"
                               className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="site-title"
                               value={payloadRequest.name} onChange={handleChange}/>
                        <div className={'invalid-feedback'}>
                          {errors.name}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <label className="form-control-label col-sm-3 text-md-right">
                        Jenis Kelamin
                      </label>
                      <div className="col-sm-6 col-md-9">
                        <div className="selectgroup w-100">
                          <label className="selectgroup-item">
                            <input type="radio" name="gender" value="MAN" id="gender"
                                   className="selectgroup-input" checked={payloadRequest.gender === 'MAN'}
                                   onChange={handleChange}/>
                            <span className="selectgroup-button selectgroup-button-icon"><i
                              className="fas fa-male mr-2"></i> Laki Laki</span>
                          </label>
                          <label className="selectgroup-item">
                            <input type="radio" name="gender" value="WOMAN" id="gender"
                                   className="selectgroup-input" checked={payloadRequest.gender === 'WOMAN'}
                                   onChange={handleChange}/>
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
                        <input type="text" name="telephone"
                               className={`form-control ${errors.telephone ? 'is-invalid' : ''}`} id="site-title"
                               value={payloadRequest.telephone ?? ''} onChange={handleChange}/>
                        <div className={'invalid-feedback'}>
                          {errors.telephone}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label htmlFor="site-title"
                             className="form-control-label col-sm-3 text-md-right">Foto Profil</label>
                      <div className="col-sm-6 col-md-9">
                        <FilePond
                          files={file}
                          onupdatefiles={setFile}
                          allowMultiple={false}
                          name="experienceResources"
                          labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                          // Konfigurasi server hanya untuk endpoint upload, tidak untuk default image
                        />
                      </div>
                    </div>

                  </>)}

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
  </AdminWrapper>))
}
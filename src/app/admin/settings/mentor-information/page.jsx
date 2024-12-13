"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useRef, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import {Loading} from "@/components/admin/Loading";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import {toast} from "react-toastify";
import {usePathname, useRouter} from "next/navigation";

import {FilePond, registerPlugin} from "react-filepond";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {SettingSidebar} from "@/components/admin/SettingSidebar";
import 'summernote/dist/summernote-bs4.css'
import '@/../public/assets/css/components.css'


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [mentorData, setMentorData] = useState({});
  const pathName = usePathname()
  const [lastPathName, setLastPathName] = useState()
  const [formData, setFormData] = useState({
    'bio': '', deletedFilesName: []
  });
  const [errors, setErrors] = useState({});
  const bioRef = useRef(null);
  const [file, setFile] = useState();
  const [oldFile, setOldFile] = useState();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 100000,
      });

      router.replace('/admin/settings/mentor-information');

      // Bersihkan query param setelah menampilkan toast
    }
  }, [router]);


  useEffect(() => {
    const splittedPath = pathName.split("/")
    setLastPathName(splittedPath[splittedPath.length - 1]);
  }, [pathName]);

  async function handleRemoveFile(error, file) {
    if (formData.deletedFilesName.indexOf(file.file.name) === -1) {
      console.log(file.file)
      setFormData({
        ...formData, deletedFilesName: [...formData.deletedFilesName, file.file.name], // Membuat salinan baru dari array dan menambahkannya
      });
    }
  }

  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await import('filepond/dist/filepond.min.css');
      await import('summernote/dist/summernote-bs4.js');

      await CommonScript();
      $(bioRef.current).on("summernote.change", () => {
        setFormData((prevFormData) => ({
          ...prevFormData, bio: ($(bioRef.current).val()),
        }));
      });
    }
    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false)
    }
    setAccessToken(Cookies.get("accessToken"))
  }, [])

  useEffect(() => {
    fetchMentorData()
    setDecodedAccessToken(CommonUtil.parseJwt(accessToken))
  }, [accessToken]);

  useEffect(() => {
    console.log(decodedAccessToken)
  }, [decodedAccessToken]);

  const fetchMentorData = async () => {

    if (accessToken) {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/settings`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        }
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        setMentorData(responseBody.result.data);
        const mentorData = responseBody.result.data;
        const allFiles = [];
        setFormData({
          bio: mentorData.bio, deletedFilesName: []
        })
        for (const resourceElement of mentorData.MentorResource) {
          console.log(resourceElement);
          allFiles.push({
            source: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/mentor-resources/profile/${mentorData.id}/${resourceElement.imagePath}`,
            options: {type: 'input'},
            name: resourceElement.imagePath,
          });
        }
        setFile(allFiles)
        setOldFile(allFiles)
      } else {
        console.error(responseBody);
      }
      setLoadingData(false);
    }
  }

  async function handleMentorInformation(e) {
    e.preventDefault()
    console.log(file)

    if (accessToken) {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Jika value adalah array, iterasi dan append setiap elemennya
          value.forEach((item) => {
            form.append(`${key}[]`, item); // Tambahkan [] untuk array format
          });
        } else {
          // Jika value bukan array, langsung append
          form.append(key, value);
        }
      });


      if (oldFile.length > 0) {
        console.log("Old")
        const updatedFiles = file.filter(file => !oldFile.some(oldFile => oldFile.name === file.file.name));
        updatedFiles.forEach((file, index) => {
          form.append(`photo`, file.file);
        });
      } else {
        for (let i = 0; i < file.length; i++) {
          form.append('photo', file[i].file)
        }
      }

      for (const [key, value] of form) {
        console.log(key, value)
      }
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/settings/mentor-information`, {
        method: 'PUT', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        }, body: form,
      });
      const responseBody = await fetchResponse.json();
      if (fetchResponse.ok) {
        setLoadingData(false);
        toast.success("Your general data successfully updated!")
      } else {
        console.log(responseBody)
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
          <div className="breadcrumb-item active">Informasi Mentor</div>
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
            <form id="mentor-information-form" onSubmit={handleMentorInformation} method='POST'
                  encType='multipart/form-data'>
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
                             className="form-control-label col-sm-3 text-md-right">Bio</label>
                      <div className="col-sm-6 col-md-9">
                          <textarea ref={bioRef} defaultValue={mentorData?.bio}
                                    className={`summernote-simple ${errors.description ? 'is-invalid' : ''}`}
                                    name="description" id="description"></textarea>
                        {errors.description}
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label htmlFor="site-title"
                             className="form-control-label col-sm-3 text-md-right">Foto Mentor</label>
                      <div className="col-sm-6 col-md-9">
                        <FilePond
                          files={file}
                          onupdatefiles={setFile}
                          allowMultiple={true}
                          maxFiles={3}
                          onremovefile={handleRemoveFile}
                          name="experienceResources"
                          labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                          // Konfigurasi server hanya untuk endpoint upload, tidak untuk default image
                        />
                        <small>Foto yang Anda lampirkan disini akan ditampilkan pada halaman marketplace mentor</small>
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
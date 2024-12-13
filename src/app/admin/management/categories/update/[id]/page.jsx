"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useCallback, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import '@/../public/assets/css/components.css'


import CommonScript from "@/components/admin/CommonScript";
import {FilePond, registerPlugin} from "react-filepond";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {useParams, useRouter} from "next/navigation";


import 'select2/dist/css/select2.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'summernote/dist/summernote-bs4.css';
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const [existingCategory, setExistingCategory] = useState({});
  const routerParam = useParams()
  const [formData, setFormData] = useState({
    name: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter()

  useEffect(() => {
    if (routerParam.id) {
      fetchExistingCategory(routerParam.id)
    }
  }, [routerParam.id]);

  async function fetchExistingCategory(id) {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/${id}`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setExistingCategory(responseBody.result.data);
      setFormData({
        name: responseBody.result.data.name,
      })
      setFiles([{
        source: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/category-icon/${responseBody.result.data.logo}`,
        options: {type: 'input'},
      }])
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  }


  useEffect(() => {
    const loadAssets = async () => {

      const $ = (await import('jquery')).default;

      await CommonScript()
    };

    if (typeof window !== 'undefined') {
      loadAssets();
    }

    setLoading(false);
  }, []);

  // useCallback to memoize handleChange function
  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));
  }, []);

  // useCallback to memoize handleSubmit function
  const handleSubmit = (async (event) => {
    event.preventDefault();
    const formDataPayload = new FormData();
    console.log(files[0].file)
    formDataPayload.append('name', formData.name);
    formDataPayload.append('logo', files[0].file);
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/${existingCategory.id}`, {
      method: 'PUT', body: formDataPayload, includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      window.location.href = '/admin/management/categories?notify=success'; // Tambahkan query param
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  });

  // useMemo to memoize validation errors display logic
  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
    };
  }, [errors]);

  return (<>
    {loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Pendidikan Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin`}>Application</a>
            </div>
            <div className="breadcrumb-item">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences`}>Pendidikan Mentor</a>
            </div>
            <div className="breadcrumb-item">Buat Data</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Membuat Data Pendidikan Mentor Baru</h2>
          <p className="section-lead col-6">
            Pada halaman ini, Anda dapat membuat data pendidikan mentor baru dengan mengisi semua field formulir
            yang telah disediakan. Dengan jejak edukasi yang memukau, Anda dapat menarik cohort untuk belajar.
          </p>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Formulir Menambah Pendidikan Mentor Baru</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="name">
                        Nama Kategori
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errorFeedback.name}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Logo</label>
                      <div className="col-sm-12 col-md-7">
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

                    <div className="form-group row mb-4">
                      <div className="col-sm-12 col-md-7 offset-md-3">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>)}
  </>);
}


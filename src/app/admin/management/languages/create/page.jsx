"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useCallback, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import CommonScript from "@/components/admin/CommonScript";

import 'select2/dist/css/select2.min.css';

// Style
import '@/../public/assets/css/components.css'
import {toast} from "react-toastify";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [formData, setFormData] = useState({
    name: '',
  });

  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, [])


  // useCallback to memoize handleChange function
  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  // useCallback to memoize handleSubmit function
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/languages`, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
      }),
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      window.location.href = '/admin/management/languages?notify=success'; // Tambahkan query param
    } else {
      toast.error('Terdapat kesalahan dalam formulir Anda!')
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  }, [formData]);

  // useMemo to memoize validation errors display logic
  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
    };
  }, [errors]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <AdminWrapper>
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
                            Nama Bahasa
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
        </AdminWrapper>
      )}
    </>
  );
}


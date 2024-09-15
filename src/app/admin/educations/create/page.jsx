"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState, useCallback, useMemo, useRef} from "react";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    studyField: '',
    startDate: '',
    endDate: '',
    activity: '',
    society: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const activityRef = useRef(null);
  const societyRef = useRef(null);
  const descriptionRef = useRef(null);


  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');
      await import('bootstrap-daterangepicker/daterangepicker.css');
      await import('summernote/dist/summernote-bs4.css');
      await CommonStyle()
      const $ = (await import('jquery')).default;
      $(descriptionRef.current).on("summernote.change", () => {
        console.log($(descriptionRef.current).val())
        setFormData((prevFormData) => ({
          ...prevFormData,
          description: ($(descriptionRef.current).val()),
        }));
      });

      $(activityRef.current).on("summernote.change", () => {
        console.log($(activityRef.current).val())
        setFormData((prevFormData) => ({
          ...prevFormData,
          activity: ($(activityRef.current).val()),
        }));
      });

      $(societyRef.current).on("summernote.change", () => {
        console.log($(societyRef.current).val())
        setFormData((prevFormData) => ({
          ...prevFormData,
          society: ($(societyRef.current).val()),
        }));
      });
      await import('select2/dist/js/select2.min');
      await import('bootstrap-daterangepicker/daterangepicker');
      await import('summernote/dist/summernote-bs4.js');
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
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  // useCallback to memoize handleSubmit function
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const form = new FormData();

    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations`, {
      method: 'POST',
      body: form,
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      console.log('Data submitted successfully', responseBody);
      setErrors({});
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
      console.log(errorMessages);
    }
  }, [formData]);

  // useMemo to memoize validation errors display logic
  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
      degree: errors.degree ? <div className="invalid-feedback">{errors.degree}</div> : null,
      studyField: errors.studyField ? <div className="invalid-feedback">{errors.studyField}</div> : null,
      startDate: errors.startDate ? <div className="invalid-feedback">{errors.startDate}</div> : null,
      endDate: errors.endDate ? <div className="invalid-feedback">{errors.endDate}</div> : null,
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
                yang telah disediakan. Dengan jejak edukasi yang memukau, Anda dapat menarik mentee untuk belajar.
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
                            Nama Intansi Pendidikan
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            {errorFeedback.name}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="degree">
                            Tingkat
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                              name="degree"
                              value={formData.degree}
                              onChange={handleChange}
                            />
                            {errorFeedback.degree}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="studyField">
                            Bidang Studi
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.studyField ? 'is-invalid' : ''}`}
                              name="studyField"
                              value={formData.studyField}
                              onChange={handleChange}
                            />
                            {errorFeedback.studyField}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal Mulai</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control datepicker ${errors.startDate ? 'is-invalid' : ''}`}
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                            />
                            {errorFeedback.startDate}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal
                            Selesai</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control datepicker ${errors.endDate ? 'is-invalid' : ''}`}
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                            />
                            {errorFeedback.endDate}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Aktivitas</label>
                          <div className="col-sm-12 col-md-7">
                            <textarea ref={activityRef}
                                      className={`summernote-simple ${errors.activity ? 'is-invalid' : ''}`}
                                      name="description" id="description"></textarea>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Perkumpulan</label>
                          <div className="col-sm-12 col-md-7">
                           <textarea ref={societyRef}
                                     className={`summernote-simple ${errors.society ? 'is-invalid' : ''}`}
                                     name="description" id="description"></textarea>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi</label>
                          <div className="col-sm-12 col-md-7">
                            <textarea ref={descriptionRef}
                                      className={`summernote-simple ${errors.description ? 'is-invalid' : ''}`}
                                      name="description" id="description"></textarea>
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


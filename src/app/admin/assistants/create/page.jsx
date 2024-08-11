"use client"
import {useEffect, useState, useCallback, useMemo, useRef} from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import AdminWrapper from "@/components/admin/AdminWrapper";

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {ssr: false});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState([]);
  // Menggunakan useRef untuk referensi elemen DOM
  const categorySelectRef = useRef(null);
  const tagsSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const [formData, setFormData] = useState({
    categoryId: '',
    topic: '',
    description: '',
    durationMinutes: '',
    price: '',
    format: '',
    capacity: '',
    language: '',
    tagId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');
      await import('bootstrap-daterangepicker/daterangepicker.css');
      await import('summernote/dist/summernote-bs4.css')

      await import('select2/dist/js/select2.min');
      await import('bootstrap-daterangepicker/daterangepicker');
      await import('summernote/dist/summernote-bs4.js')
      const $ = window.jQuery;
      $(categorySelectRef.current).on("change", handleChange);
      $(tagsSelectRef.current).select2({
        change: handleSubmit
      });
      $(languageSelectRef.current).select2({
        change: handleSubmit
      });
    };

    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchAssistanceCategories(),
          fetchAssistanceTags(),
          fetchAssistanceLanguage()
        ]);
      } catch (error) {
        console.error('Failed to fetch initial or load libs', error);
      }
    };

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    fetchInitialData();
    setLoading(false);
  }, []);

  const fetchAssistanceCategories = async () => {
    if (categories.length === 0) {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setCategories(responseBody['result']['data']);
        console.log(responseBody['result']['data']);
      } else {
        console.error('Failed to fetch categories', responseBody);
      }
    }
  };

  const fetchAssistanceTags = async () => {
    if (tags.length === 0) {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/tags`);
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setTags(responseBody['result']['data']);
        console.log(tags)
      } else {
        console.error('Failed to fetch tags', responseBody);
      }
    }
  };

  const filteredTags = useMemo(() => {
    console.log('Filtering tags:', tags, 'with categoryId:', formData.categoryId);
    return tags.filter(tag => tag.categoryId == formData.categoryId);
  }, [tags, formData.categoryId]);

  const fetchAssistanceLanguage = async () => {
    if (language.length === 0) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/languages`);
      const responseBody = await response.json();
      if (response.ok) {
        setLanguage(responseBody.data);
      } else {
        console.error('Failed to fetch languages', responseBody);
      }
    }
  };

  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations`, {
      method: 'POST',
      body: form,
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await response.json();

    if (response.ok) {
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

  const errorFeedback = useMemo(() => ({
    topic: errors.topic ? <div className="invalid-feedback">{errors.topic}</div> : null,
    durationMinutes: errors.durationMinutes ? <div className="invalid-feedback">{errors.durationMinutes}</div> : null,
    price: errors.price ? <div className="invalid-feedback">{errors.price}</div> : null,
    capacity: errors.capacity ? <div className="invalid-feedback">{errors.capacity}</div> : null,
    language: errors.language ? <div className="invalid-feedback">{errors.language}</div> : null,
    format: errors.format ? <div className="invalid-feedback">{errors.format}</div> : null,
    tagId: errors.tagId ? <div className="invalid-feedback">{errors.tagId}</div> : null,
    description: errors.description ? <small className="text-danger">{errors.description}</small> : null,
  }), [errors]);

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
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="category">
                            Kategori Asistensi
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <select ref={categorySelectRef} className="form-control select2"
                                    name="employmentType">
                              {categories.map((value, index) => {
                                return <option key={index} value={value['id']}>{value['name']}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="topic">
                            Topik
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.topic ? 'is-invalid' : ''}`}
                              name="topic"
                              value={formData.topic}
                              onChange={handleChange}
                            />
                            {errorFeedback.topic}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                                 htmlFor="durationMinutes">
                            Durasi
                          </label>
                          <div className="col-sm-8 col-md-5 input-group">
                            <input
                              type="text"
                              className={`form-control ${errors.durationMinutes ? 'is-invalid' : ''}`}
                              name="durationMinutes"
                              value={formData.durationMinutes}
                              onChange={handleChange}
                            />
                            <div className="input-group-append">
                              <div className="input-group-text">
                                Menit
                              </div>
                            </div>
                            {errorFeedback.durationMinutes}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                                 htmlFor="durationMinutes">
                            Harga
                          </label>
                          <div className="col-sm-8 col-md-5 input-group">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                Rupiah
                              </div>
                            </div>
                            <input
                              type="text"
                              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                            />
                            {errorFeedback.price}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                                 htmlFor="capacity">
                            Kapasitas
                          </label>
                          <div className="col-sm-9 col-md-5 input-group">
                            <input
                              type="text"
                              className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                              name="capacity"
                              value={formData.capacity}
                              onChange={handleChange}
                            />
                            <div className="input-group-append">
                              <div className="input-group-text">
                                Orang
                              </div>
                            </div>
                            {errorFeedback.capacity}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="format">
                            Format Asistensi
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <select className="form-control select2" onChange={handleChange} name="format">
                              <option value="INDIVIDUAL">INDIVIDUAL</option>
                              <option value="GROUP">GROUP</option>
                              <option value="HYBRID">HYBRID</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="tags">
                            Tag
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <select className="form-control select2" multiple="" onChange={handleChange}
                                    name="tags">
                              {filteredTags.map((value, index) => {
                                return <option key={index} value={value.id}>{value.name}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="language">
                            Bahasa
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <select className="form-control select2" multiple="" onChange={handleChange}
                                    name="language">
                              {language.map((value, index) => {
                                return <option key={index} value={value}>{value}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-4">

                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi</label>
                          <div className="col-sm-12 col-md-7">
                            <textarea className="summernote-simple"></textarea>
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



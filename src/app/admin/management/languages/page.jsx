"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useMemo, useRef, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter, useSearchParams} from "next/navigation";
import 'select2/dist/css/select2.min.css';

import '@/../public/assets/css/components.css'

export default function Page() {
  const buttonColors = ['primary', 'danger', 'warning', 'success', 'dark']
  const [accessToken, setAccessToken] = useState(null);
  const [allLanguage, setAllLanguage] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: ''
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const searchParams = useSearchParams();
  const [activeLanguage, setActiveLanguage] = useState({});
  const categorySelectRef = useRef(null);

  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'languages-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/management/languages');
    }
  }, [searchParams, router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await import('select2/dist/js/select2.min');

      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    fetchAllTags()
  }, [accessToken]);

  useEffect(() => {
  }, [allLanguage]);

  const fetchAllCategory = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllCategory(responseBody.result.data);
        } else {
          console.error('Failed to fetch education', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }
  const fetchAllTags = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/languages`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllLanguage(responseBody.result.data);
        } else {
          console.error('Failed to fetch education', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  async function triggerDeleteCategory(id) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/${id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllLanguage((prevAllMentorCategory) => prevAllMentorCategory.filter((education) => education.id !== id));
          router.push('/admin/management/categories?notify=success');
        } else {
          toast.error('Data gagal dihapus, kemungkinan terdapat asistensi yang menggunakan kategori tersebut')
          console.error('Failed to fetch categories', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  const handleSubmit = (async (event) => {
    event.preventDefault();

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/languages/${activeLanguage.id}`, {
      method: 'PUT', body: JSON.stringify({
        name: formData.name,
      }), includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      const language = allLanguage.find((language) => language.id === activeLanguage.id);
      language.name = formData.name
      setAllLanguage([
        ...allLanguage.filter((language) => language.id !== activeLanguage.id), // Array tanpa activeLanguage
        language // Tambahkan language baru
      ]);
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  });

  const handleChange = ((e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));
  });

  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
    };
  }, [errors]);


  async function triggerDelete() {

  }

  async function triggerEditForm(language) {
    const $ = window.jQuery;
    console.log(language)
    $(categorySelectRef.current).val(language.categoryId).trigger('change');
    setActiveLanguage(language)
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: language.name
    }))
  }

  return (loading ? (<Loading/>) : (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <h1>Kategori Asistensi</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item active"><a href="#">Admin</a></div>
          <div className="breadcrumb-item"><a href="#">Management</a></div>
          <div className="breadcrumb-item">Kategori</div>
        </div>
      </div>

      <div className="section-body">
        <h2 className="section-title">Overview</h2>
        <p className="section-lead w-50">
          Kelola data kategori management dengan praktis. Tambahkan, perbarui, atau hapus informasi kategori untuk
          mendukung profil management yang kredibel.
        </p>
        <div className="container">
          <div className="d-flex flex-row">
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>) : (allLanguage.length > 0 ? (<div className="col-6 col-md-6 col-sm-12 col-lg-6 pl-0">
              <div className="d-flex flex-wrap" style={{gap: 5 + 'px'}}>
                {allLanguage.map((language, index) => (<button key={`languages-${language.id}`} type="button"
                                                               onClick={() => {
                                                                 triggerEditForm(language)
                                                               }}
                                                               className={`btn btn-${buttonColors[index % buttonColors.length]}`}>
                  {language.name}
                </button>))}
              </div>
            </div>) : (<div className="col-12 col-md-6 col-sm-12 p-0 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Empty Data</h4>
                </div>
                <div className="card-body">
                  <div className="empty-state" data-height="400">
                    <div className="empty-state-icon">
                      <i className="fas fa-question"></i>
                    </div>
                    <h2>We couldn't find any data</h2>
                    <p className="lead">
                      Sorry we can't find any data, to get rid of this message, make at least 1 entry.
                    </p>
                    <a href="/admin/management/categories/create" className="btn btn-primary mt-4">Create new
                      One</a>
                    <a href="#" className="mt-4 bb">Need Help?</a>
                  </div>
                </div>
              </div>
            </div>))}
            <div className="col-6 col-md-6 col-sm-12 col-lg-6 pl-0">
              <div className="card">
                <div className="card-header">
                  <h4>Formulir Menambah Kemampuan Mentor Baru</h4>
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
      </div>
    </section>
  </AdminWrapper>))
}
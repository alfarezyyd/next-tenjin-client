"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useMemo, useRef, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import 'select2/dist/css/select2.min.css';

import '@/../public/assets/css/components.css'

export default function Page() {
  const buttonColors = ['primary', 'danger', 'warning', 'success', 'dark']
  const [accessToken, setAccessToken] = useState(null);
  const [allTags, setAllTags] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [activeTag, setActiveTag] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const categorySelectRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'tags-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/management/tags');
    }
  }, [router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await import('select2/dist/js/select2.min');
      $(categorySelectRef.current).on("change", () => {
        setSelectedCategoryId($(categorySelectRef.current).val());
      });
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    fetchAllCategory();
    fetchAllTags()
  }, [accessToken]);

  useEffect(() => {
  }, [allTags]);

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
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/tags`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllTags(responseBody.result.data);
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

  async function triggerDeleteTag() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/tags/${activeTag.id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (responseFetch.ok) {
          setAllTags((prevAllMentorCategory) => prevAllMentorCategory.filter((category) => category.id !== activeTag.id));
          setFormData({
            name: ''
          })
          toast.success('Tags deleted successfully!', {
            position: 'top-right', autoClose: 3000, toastId: 'tags-danger',
          })
        } else {
          toast.error('Data gagal dihapus, kemungkinan terdapat asistensi yang menggunakan tag tersebut')
        }
      } catch (error) {
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  const handleSubmit = (async (event) => {
    event.preventDefault();

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/tags/${activeTag.id}`, {
      method: 'PUT', body: JSON.stringify({
        name: formData.name,
        categoryId: selectedCategoryId,
      }), includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      toast.success('Data berhasil diperbarui')
      const tag = allTags.find((tag) => tag.id === activeTag.id);
      tag.name = formData.name
      setAllTags([
        ...allTags.filter((tag) => tag.id !== activeTag.id), // Array tanpa activeTag
        tag // Tambahkan tag baru
      ]);
    } else {
      toast.error('Terdapat kesalahan dalam formulir Anda!')
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


  async function triggerEditForm(tag) {
    const $ = window.jQuery;
    $(categorySelectRef.current).val(tag.categoryId).trigger('change');
    setActiveTag(tag)
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: tag.name
    }))
  }

  return (loading ? (<Loading/>) : (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <h1>Tag Asistensi</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item active"><a href="#">Admin</a></div>
          <div className="breadcrumb-item"><a href="#">Management</a></div>
          <div className="breadcrumb-item">Tag</div>
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
              <Loading/>) : (allTags.length > 0 ? (<div className="col-6 col-md-6 col-sm-12 col-lg-6 pl-0">
              <div className="d-flex flex-wrap" style={{gap: 5 + 'px'}}>
                {allTags.map((tag, index) => (<button key={`tags-${tag.id}`} type="button"
                                                      onClick={() => {
                                                        triggerEditForm(tag)
                                                      }}
                                                      className={`btn btn-${buttonColors[index % buttonColors.length]}`}>
                  {tag.name}
                </button>))}
              </div>
            </div>) : (<div className="col-12 col-md-6 col-sm-12 p-0 mx-auto">
              <div className="card mr-5">
                <div className="card-header">
                  <h4>Empty Data</h4>
                </div>
                <div className="card-body">
                  <div className="empty-state" data-height="400">
                    <div className="empty-state-icon">
                      <i className="fas fa-question"></i>
                    </div>
                    <h2>We could not find any data</h2>
                    <p className="lead">
                      Sorry we can not find any data, to get rid of this message, make at least 1 entry.
                    </p>
                    <a href="/admin/management/tags/create" className="btn btn-primary mt-4">Create new
                      One</a>
                  </div>
                </div>
              </div>
            </div>))}
            <div className="col-6 col-md-6 col-sm-12 col-lg-6 pl-0">
              <div className="card">
                <div className="card-header">
                  <h4>Formulir Mengubah Bahasa</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="categoryId">
                        Tag Asistensi
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <select ref={categorySelectRef} className="form-control select2"
                                name="categoryId" id="categoryId">
                          {allCategory?.length > 0 && allCategory.map((value, index) => (
                            <option key={index} value={Number(value['id'])}>{value['name']}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="name">
                        Nama Tag
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
                      <div className="col-sm-12 col-md-7 offset-md-3 ">
                        <button type="submit" className="btn btn-primary mr-2" disabled={activeTag == null}>
                          Submit
                        </button>
                        <button type="button" className="btn btn-danger" onClick={triggerDeleteTag}
                                disabled={activeTag == null}>
                          Delete
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
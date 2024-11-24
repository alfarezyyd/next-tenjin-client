"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Loading} from "@/components/admin/Loading";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from 'react-toastify';

import 'summernote/dist/summernote-bs4.css'
import '@/../public/assets/css/components.css'

export default function Page() {
  const buttonColors = ['primary', 'danger', 'warning', 'success', 'dark']
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorSkill, setAllMentorSkill] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '',
  });
  const [errors, setErrors] = useState({});
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000,
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/mentor/skills');
    }
  }, [searchParams, router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await import('summernote/dist/summernote-bs4.js');
      await CommonScript();
      $(descriptionRef.current).on("summernote.change", () => {
        setFormData((prevFormData) => ({
          ...prevFormData, description: ($(descriptionRef.current).val()),
        }));
      });
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    fetchMentorSkills();
  }, [accessToken]);

  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));
  }, []);


  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/skills/${activeId}`, {
      method: 'PUT', body: JSON.stringify(formData), includeCredentials: true, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      router.push('/admin/mentor/skills?notify=success');
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  }, [formData]);

  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
      description: errors.description ? <small className="text-danger">{errors.description}</small> : null,
    };
  }, [errors]);

  const fetchMentorSkills = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/skills`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          console.log(responseBody)
          setAllMentorSkill(responseBody.result.data);
          console.log(responseBody.result.data);
        } else {
          console.error('Failed to fetch skill', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }


  async function triggerEditForm(mentorSkill) {
    const $ = (await import('jquery')).default;
    $(descriptionRef.current).summernote('code', mentorSkill.description);
    setActiveId(mentorSkill.id);
    setFormData({
      name: mentorSkill.name, description: mentorSkill.description,
    })
  }

  async function triggerDelete() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/skills/${activeId}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllMentorSkill((prevAllMentorSkill) => prevAllMentorSkill.filter((skill) => skill.id !== activeId));
          toast.success('Data submitted successfully!', {
            position: 'top-right', autoClose: 10000,
          });
        } else {
          console.error('Failed to fetch skill', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  return (<>
    {loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Kemampuan Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Pendidikan</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Overview</h2>
          <p className="section-lead w-50">
            Atur keahlian mentor dengan mudah. Tambahkan, perbarui, atau hapus keterampilan untuk mencerminkan kemampuan
            mereka secara akurat.
          </p>
          <section className="hero-section">
            <div className="d-flex flex-row">
              <div className="col-6 col-md-6 col-sm-12 col-lg-6 pl-0">
                <div className="d-flex flex-row flex-wrap" style={{gap: 5 + "px"}}>
                  {loading ? (  // Tampilkan loading selama data belum tersedia
                    <Loading/>) : (allMentorSkill.length > 0 ? (allMentorSkill.map((mentorSkill, index) => (
                    <button key={`mentorSkill-${mentorSkill.id}`} type="button" onClick={() => {
                      triggerEditForm(mentorSkill)
                    }} className={`btn btn-${buttonColors[index % buttonColors.length]}`}>
                      {mentorSkill.name}
                    </button>))) : (
                    <div className="col-12 col-md-12 col-sm-12 p-0 mx-auto">
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
                            <a href="/admin/mentor/skills/create" className="btn btn-primary mt-4">Create new
                              One</a>
                            <a href="#" className="mt-4 bb">Need Help?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-6 col-md-6 col-sm-12 col-lg-7 pl-0">
                <div className="card">
                  <div className="card-header">
                    <h4>Formulir Menambah Kemampuan Mentor Baru</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="name">
                          Nama Kemampuan
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
                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                               htmlFor="description">Deskripsi</label>
                        <div className="col-sm-12 col-md-7">
                                <textarea ref={descriptionRef}
                                          className={`summernote-simple ${errors.description ? 'is-invalid' : ''}`}
                                          name="description" id="description"></textarea>
                          {errorFeedback.description}
                        </div>
                      </div>

                      <div className="form-group row mb-4">
                        <div className="col-sm-12 col-md-7 offset-md-3">
                          <button type="submit" className="btn btn-primary mr-2">
                            Submit
                          </button>
                          <button type="button" className="btn btn-danger" onClick={triggerDelete}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </section>
    </AdminWrapper>)}
  </>)
}